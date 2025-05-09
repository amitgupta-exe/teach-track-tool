
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Course, Learner } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays, parse } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { sendCourseAssignmentMessage } from '@/integrations/wati/functions';

const formSchema = z.object({
  course_id: z.string().min(1, {
    message: "Please select a course.",
  }),
  start_date_string: z.string().min(1, {
    message: "Please enter a start date (YYYY-MM-DD).",
  }).refine((value) => {
    try {
      const date = parse(value, 'yyyy-MM-dd', new Date());
      return !isNaN(date.getTime()) && date >= new Date(new Date().setHours(0, 0, 0, 0));
    } catch (error) {
      return false;
    }
  }, {
    message: "Invalid date or date is in the past.",
  }),
  status: z.enum(['scheduled', 'in_progress', 'completed'], {
    required_error: "Please select a status.",
  }),
});

interface CourseAssignmentProps {
  learner: Learner;
  preselectedCourse?: Course | null;
  onAssigned: () => void;
  onCancel: () => void;
}

const CourseAssignment: React.FC<CourseAssignmentProps> = ({
  learner,
  preselectedCourse,
  onAssigned,
  onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignedCourseIds, setAssignedCourseIds] = useState<string[]>([]);
  const { user } = useAuth();

  // Set default start date to tomorrow
  const tomorrow = addDays(new Date(), 1);
  const defaultDateString = format(tomorrow, 'yyyy-MM-dd');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'scheduled',
      start_date_string: defaultDateString,
      course_id: preselectedCourse ? preselectedCourse.id : undefined,
    },
  });

  useEffect(() => {
    // Update course_id field when preselectedCourse changes
    if (preselectedCourse) {
      form.setValue('course_id', preselectedCourse.id);
    }
  }, [preselectedCourse, form]);

  // Check if a course is from Alfred (has an alfred- prefix)
  const isAlfredCourse = (courseId: string) => {
    return typeof courseId === 'string' && courseId.startsWith('alfred-');
  };

  // Fetch available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Fetch all courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'active');

        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          toast.error('Failed to load courses');
          return;
        }

        // Fetch already assigned courses to this learner
        const { data: assignedCourses, error: assignedError } = await supabase
          .from('learner_courses')
          .select('course_id')
          .eq('learner_id', learner.id);

        if (assignedError) {
          console.error('Error fetching assigned courses:', assignedError);
          toast.error('Failed to load assigned courses');
          return;
        }

        // Set the assigned course IDs to filter them out
        const assignedIds = assignedCourses.map(ac => ac.course_id);
        setAssignedCourseIds(assignedIds);

        // Transform the data to include the days property required by the Course type
        const transformedCourses: Course[] = coursesData.map(course => ({
          ...course,
          days: [], // Add empty days array to satisfy the Course type
          status: course.status as 'active' | 'archived' | 'draft', // Type assertion to match Course type
          visibility: course.visibility as 'public' | 'private' // Type assertion for visibility
        }));

        setCourses(transformedCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [learner.id]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Parse the date string to a Date object
      const startDate = parse(data.start_date_string, 'yyyy-MM-dd', new Date());
      let courseId = data.course_id;
      let courseName = "";

      if (isAlfredCourse(data.course_id)) {
        // For Alfred courses, we need a different approach
        // First, let's get the course name from the ID
        const alfredCourseId = data.course_id;
        const alfredCourseName = preselectedCourse?.name || alfredCourseId.replace('alfred-', '').replace(/-/g, ' ');
        courseName = alfredCourseName;
        
        console.log("Creating course from Alfred data:", alfredCourseName);
        
        // We need to create a regular course first
        const { data: newCourseData, error: newCourseError } = await supabase
          .from('courses')
          .insert({
            name: alfredCourseName,
            description: `${alfredCourseName} - Generated from Alfred course`,
            category: 'Alfred Course',
            language: 'English',
            status: 'active',
            visibility: 'public',
            created_by: user?.id || ''
          })
          .select('*')
          .single();
          
        if (newCourseError) {
          console.error('Error creating course from Alfred data:', newCourseError);
          toast.error('Failed to prepare course for assignment');
          throw newCourseError;
        }

        console.log("New course created:", newCourseData);

        // Fetch Alfred course data
        const { data: alfredData, error: alfredError } = await supabase
          .from('alfred_course_data')
          .select('*')
          .eq('course_name', alfredCourseName)
          .order('day');
          
        if (alfredError) {
          console.error('Error fetching alfred course data:', alfredError);
          throw alfredError;
        }

        console.log("Alfred data fetched:", alfredData);

        // Create course days from Alfred data
        if (alfredData && alfredData.length > 0) {
          const courseDays = alfredData.map(day => ({
            course_id: newCourseData.id,
            day_number: day.day,
            title: `Day ${day.day}`,
            info: day.module_1_text || 'No content available',
            module_1: day.module_1_text || null,
            module_2: day.module_2_text || null,
            module_3: day.module_3_text || null
          }));
          
          const { error: daysError } = await supabase
            .from('course_days')
            .insert(courseDays);
            
          if (daysError) {
            console.error('Error creating course days:', daysError);
            toast.error('Failed to create course days');
            throw daysError;
          }
          
          console.log("Course days created successfully");
        }

        // Now we assign the newly created course
        courseId = newCourseData.id;
      } else {
        // For regular courses, find the course name
        const selectedCourse = courses.find(c => c.id === data.course_id);
        if (selectedCourse) {
          courseName = selectedCourse.name;
        }
      }

      const newLearnerCourse = {
        learner_id: learner.id,
        course_id: courseId,
        start_date: startDate.toISOString(),
        status: data.status,
        completion_percentage: data.status === 'completed' ? 100 : 0,
      };

      console.log('Assigning course with data:', newLearnerCourse);

      const { data: insertedData, error } = await supabase
        .from('learner_courses')
        .insert([newLearnerCourse])
        .select();

      if (error) {
        console.error('Error assigning course:', error);
        toast.error('Failed to assign course');
        throw error;
      }

      // Increment total courses for the learner
      const { error: learnerUpdateError } = await supabase
        .from('learners')
        .update({
          total_courses: (learner.total_courses || 0) + 1
        })
        .eq('id', learner.id);

      if (learnerUpdateError) {
        console.error('Error updating learner:', learnerUpdateError);
      }

      // Increment total enrollments for the course
      const { error: courseUpdateError } = await supabase
        .from('courses')
        .update({
          total_enrollments: courses.find(c => c.id === courseId)?.total_enrollments ?? 0 + 1
        })
        .eq('id', courseId);

      if (courseUpdateError) {
        console.error('Error updating course:', courseUpdateError);
      }

      console.log('Course assigned successfully:', insertedData);

      // Send WhatsApp notification using our direct function
      try {
        await sendCourseAssignmentMessage(
          learner.id, 
          courseId, 
          startDate.toISOString()
        );
        console.log('WhatsApp notification sent successfully');
      } catch (notifyError) {
        console.error('Failed to send WhatsApp notification:', notifyError);
        // Don't block the course assignment if notification fails
      }

      toast.success('Course assigned successfully');
      onAssigned();
    } catch (error) {
      console.error('Course assignment error:', error);
      toast.error('Failed to assign course');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter out already assigned courses
  const availableCourses = courses.filter(course =>
    !assignedCourseIds.includes(course.id)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {!preselectedCourse && (
            loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Loading courses...</span>
              </div>
            ) : availableCourses.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No available courses to assign. All courses have been assigned to this learner.
              </div>
            ) : (
              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}

          <FormField
            control={form.control}
            name="start_date_string"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date (YYYY-MM-DD)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="YYYY-MM-DD"
                    className="glass-input"
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || (!preselectedCourse && availableCourses.length === 0)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              'Assign Course'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseAssignment;
