
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface Learner {
  id: string;
  name: string;
  email: string;
  phone: string;
  courses?: Course[]; // Make courses optional
  created_at: string;
  status: 'active' | 'inactive';
  total_courses?: number; // New field to track total courses
}

export interface CourseDay {
  id: string;
  day_number: number;
  title: string;
  info: string;
  media_link?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  days: CourseDay[];
  created_at: string;
  status: 'active' | 'archived' | 'draft';
  total_enrollments?: number; // Add this property to track enrollments
}

export interface LearnerCourse {
  id: string;
  learner_id: string;
  course_id: string;
  start_date: string;
  completion_percentage: number;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface MessageSent {
  id: string;
  learner_id: string;
  course_id: string;
  course_day_id: string;
  sent_at: string;
  type: 'whatsapp' | 'email';
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface WatiConfig {
  id?: string;
  user_id: string;
  serri_api_key: string; // Using the existing database column name for now
  serri_endpoint?: string; // Optional as we might not need this anymore
  is_configured: boolean;
}

export interface AnalyticsData {
  total_learners: number;
  active_courses: number;
  messages_sent: {
    total: number;
    whatsapp: number;
    email: number;
  };
  completion_rate: number;
  messages_per_day: { date: string; count: number }[];
  learners_per_course: { course: string; count: number }[];
}
