
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
  learner_count?: number; // Add this property to fix the TypeScript error
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
  api_key: string;
  endpoint: string;
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
