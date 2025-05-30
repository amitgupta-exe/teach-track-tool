export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alfred_course_data: {
        Row: {
          course_name: string
          created_at: string
          day: number
          id: string
          module_1_text: string | null
          module_2_text: string | null
          module_3_text: string | null
        }
        Insert: {
          course_name: string
          created_at?: string
          day: number
          id?: string
          module_1_text?: string | null
          module_2_text?: string | null
          module_3_text?: string | null
        }
        Update: {
          course_name?: string
          created_at?: string
          day?: number
          id?: string
          module_1_text?: string | null
          module_2_text?: string | null
          module_3_text?: string | null
        }
        Relationships: []
      }
      cop_students: {
        Row: {
          airtable_id: string | null
          "Certificate File": string | null
          "completed courses": number | null
          Completion_Certificate: string | null
          "Course Completed": boolean | null
          "Course Status": string | null
          Created: string | null
          Date: string | null
          "Day Completed": number | null
          Doubt: string | null
          Feedback: string | null
          Goal: string | null
          id: number
          Interactive_Responses: Json | null
          "Join Waitlist": boolean | null
          Language: string | null
          Last_Msg: string | null
          "Module Completed": number | null
          Name: string | null
          "Next Day": string | null
          "Next Module": string | null
          Phone: string | null
          Progress: number | null
          "Question Responses": Json | null
          Responses: Json | null
          Style: string | null
          Topic: string | null
        }
        Insert: {
          airtable_id?: string | null
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Update: {
          airtable_id?: string | null
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Relationships: []
      }
      course_data: {
        Row: {
          airtable_id: string | null
          "Certificate File": string | null
          "completed courses": number | null
          Completion_Certificate: string | null
          "Course Completed": boolean | null
          "Course Status": string | null
          Created: string | null
          Date: string | null
          "Day Completed": number | null
          Doubt: string | null
          Feedback: string | null
          Goal: string | null
          id: number
          Interactive_Responses: Json | null
          "Join Waitlist": boolean | null
          Language: string | null
          Last_Msg: string | null
          "Module Completed": number | null
          Name: string | null
          "Next Day": string | null
          "Next Module": string | null
          Phone: string | null
          Progress: number | null
          "Question Responses": Json | null
          Responses: Json | null
          Style: string | null
          Topic: string | null
        }
        Insert: {
          airtable_id?: string | null
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Update: {
          airtable_id?: string | null
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Relationships: []
      }
      course_days: {
        Row: {
          course_id: string
          created_at: string
          day_number: number
          id: string
          info: string
          media_link: string | null
          module_1: string | null
          module_2: string | null
          module_3: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          day_number: number
          id?: string
          info: string
          media_link?: string | null
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          day_number?: number
          id?: string
          info?: string
          media_link?: string | null
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_days_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_generation_requests: {
        Row: {
          course_title: string
          created_at: string | null
          created_by: string | null
          goal: string
          language: string
          request_id: string
          style: string
          topic: string
        }
        Insert: {
          course_title: string
          created_at?: string | null
          created_by?: string | null
          goal: string
          language: string
          request_id?: string
          style: string
          topic: string
        }
        Update: {
          course_title?: string
          created_at?: string | null
          created_by?: string | null
          goal?: string
          language?: string
          request_id?: string
          style?: string
          topic?: string
        }
        Relationships: []
      }
      course_name: {
        Row: {
          day: number
          id: string
          module_1_answer: string | null
          module_1_ibody: string | null
          module_1_ibuttons: string | null
          module_1_link: string | null
          module_1_list: string | null
          module_1_ltitle: string | null
          module_1_next: string | null
          module_1_question: string | null
          module_1_text: string | null
          module_2_answer: string | null
          module_2_ibody: string | null
          module_2_ibuttons: string | null
          module_2_link: string | null
          module_2_list: string | null
          module_2_ltitle: string | null
          module_2_next: string | null
          module_2_question: string | null
          module_2_text: string | null
          module_3_answer: string | null
          module_3_ibody: string | null
          module_3_ibuttons: string | null
          module_3_link: string | null
          module_3_list: string | null
          module_3_ltitle: string | null
          module_3_next: string | null
          module_3_question: string | null
          module_3_text: string | null
          module_4_answer: string | null
          module_4_ibody: string | null
          module_4_ibuttons: string | null
          module_4_link: string | null
          module_4_list: string | null
          module_4_ltitle: string | null
          module_4_next: string | null
          module_4_question: string | null
          module_4_text: string | null
          module_5_answer: string | null
          module_5_ibody: string | null
          module_5_ibuttons: string | null
          module_5_link: string | null
          module_5_list: string | null
          module_5_ltitle: string | null
          module_5_next: string | null
          module_5_question: string | null
          module_5_text: string | null
        }
        Insert: {
          day: number
          id?: string
          module_1_answer?: string | null
          module_1_ibody?: string | null
          module_1_ibuttons?: string | null
          module_1_link?: string | null
          module_1_list?: string | null
          module_1_ltitle?: string | null
          module_1_next?: string | null
          module_1_question?: string | null
          module_1_text?: string | null
          module_2_answer?: string | null
          module_2_ibody?: string | null
          module_2_ibuttons?: string | null
          module_2_link?: string | null
          module_2_list?: string | null
          module_2_ltitle?: string | null
          module_2_next?: string | null
          module_2_question?: string | null
          module_2_text?: string | null
          module_3_answer?: string | null
          module_3_ibody?: string | null
          module_3_ibuttons?: string | null
          module_3_link?: string | null
          module_3_list?: string | null
          module_3_ltitle?: string | null
          module_3_next?: string | null
          module_3_question?: string | null
          module_3_text?: string | null
          module_4_answer?: string | null
          module_4_ibody?: string | null
          module_4_ibuttons?: string | null
          module_4_link?: string | null
          module_4_list?: string | null
          module_4_ltitle?: string | null
          module_4_next?: string | null
          module_4_question?: string | null
          module_4_text?: string | null
          module_5_answer?: string | null
          module_5_ibody?: string | null
          module_5_ibuttons?: string | null
          module_5_link?: string | null
          module_5_list?: string | null
          module_5_ltitle?: string | null
          module_5_next?: string | null
          module_5_question?: string | null
          module_5_text?: string | null
        }
        Update: {
          day?: number
          id?: string
          module_1_answer?: string | null
          module_1_ibody?: string | null
          module_1_ibuttons?: string | null
          module_1_link?: string | null
          module_1_list?: string | null
          module_1_ltitle?: string | null
          module_1_next?: string | null
          module_1_question?: string | null
          module_1_text?: string | null
          module_2_answer?: string | null
          module_2_ibody?: string | null
          module_2_ibuttons?: string | null
          module_2_link?: string | null
          module_2_list?: string | null
          module_2_ltitle?: string | null
          module_2_next?: string | null
          module_2_question?: string | null
          module_2_text?: string | null
          module_3_answer?: string | null
          module_3_ibody?: string | null
          module_3_ibuttons?: string | null
          module_3_link?: string | null
          module_3_list?: string | null
          module_3_ltitle?: string | null
          module_3_next?: string | null
          module_3_question?: string | null
          module_3_text?: string | null
          module_4_answer?: string | null
          module_4_ibody?: string | null
          module_4_ibuttons?: string | null
          module_4_link?: string | null
          module_4_list?: string | null
          module_4_ltitle?: string | null
          module_4_next?: string | null
          module_4_question?: string | null
          module_4_text?: string | null
          module_5_answer?: string | null
          module_5_ibody?: string | null
          module_5_ibuttons?: string | null
          module_5_link?: string | null
          module_5_list?: string | null
          module_5_ltitle?: string | null
          module_5_next?: string | null
          module_5_question?: string | null
          module_5_text?: string | null
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          course_name: string | null
          created_at: string | null
          current_day: number | null
          day1_module1: boolean | null
          day1_module2: boolean | null
          day1_module3: boolean | null
          day2_module1: boolean | null
          day2_module2: boolean | null
          day2_module3: boolean | null
          day3_module1: boolean | null
          day3_module2: boolean | null
          day3_module3: boolean | null
          feedback: string | null
          id: string
          is_active: boolean | null
          last_module_completed_at: string | null
          last_reminder_sent_at: string | null
          learner_id: string | null
          learner_name: string | null
          notes: string | null
          phone_number: string | null
          progress_percent: number | null
          reminder_count: number | null
          reminder_count_day1: number | null
          reminder_count_day2: number | null
          reminder_count_day3: number | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          course_name?: string | null
          created_at?: string | null
          current_day?: number | null
          day1_module1?: boolean | null
          day1_module2?: boolean | null
          day1_module3?: boolean | null
          day2_module1?: boolean | null
          day2_module2?: boolean | null
          day2_module3?: boolean | null
          day3_module1?: boolean | null
          day3_module2?: boolean | null
          day3_module3?: boolean | null
          feedback?: string | null
          id?: string
          is_active?: boolean | null
          last_module_completed_at?: string | null
          last_reminder_sent_at?: string | null
          learner_id?: string | null
          learner_name?: string | null
          notes?: string | null
          phone_number?: string | null
          progress_percent?: number | null
          reminder_count?: number | null
          reminder_count_day1?: number | null
          reminder_count_day2?: number | null
          reminder_count_day3?: number | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          course_name?: string | null
          created_at?: string | null
          current_day?: number | null
          day1_module1?: boolean | null
          day1_module2?: boolean | null
          day1_module3?: boolean | null
          day2_module1?: boolean | null
          day2_module2?: boolean | null
          day2_module3?: boolean | null
          day3_module1?: boolean | null
          day3_module2?: boolean | null
          day3_module3?: boolean | null
          feedback?: string | null
          id?: string
          is_active?: boolean | null
          last_module_completed_at?: string | null
          last_reminder_sent_at?: string | null
          learner_id?: string | null
          learner_name?: string | null
          notes?: string | null
          phone_number?: string | null
          progress_percent?: number | null
          reminder_count?: number | null
          reminder_count_day1?: number | null
          reminder_count_day2?: number | null
          reminder_count_day3?: number | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "generated_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_progress_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "registration_requests"
            referencedColumns: ["request_id"]
          },
        ]
      }
      course_prompt_templates: {
        Row: {
          created_at: string
          id: string
          name: string
          prompt: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          prompt: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          prompt?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string
          id: string
          language: string
          name: string
          status: string
          total_enrollments: number
          updated_at: string
          visibility: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          language: string
          name: string
          status: string
          total_enrollments?: number
          updated_at?: string
          visibility?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          language?: string
          name?: string
          status?: string
          total_enrollments?: number
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_courses: {
        Row: {
          created_at: string | null
          day: number
          id: string
          module_1: string | null
          module_2: string | null
          module_3: string | null
          request_id: string | null
          topic_name: string | null
        }
        Insert: {
          created_at?: string | null
          day: number
          id?: string
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          request_id?: string | null
          topic_name?: string | null
        }
        Update: {
          created_at?: string | null
          day?: number
          id?: string
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          request_id?: string | null
          topic_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_courses_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "registration_requests"
            referencedColumns: ["request_id"]
          },
        ]
      }
      learner_courses: {
        Row: {
          completion_percentage: number
          course_id: string
          created_at: string
          id: string
          learner_id: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          completion_percentage?: number
          course_id: string
          created_at?: string
          id?: string
          learner_id: string
          start_date: string
          status: string
          updated_at?: string
        }
        Update: {
          completion_percentage?: number
          course_id?: string
          created_at?: string
          id?: string
          learner_id?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learner_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learner_courses_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
        ]
      }
      learners: {
        Row: {
          created_at: string
          created_by: string
          email: string
          id: string
          name: string
          phone: string
          status: string
          total_courses: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          email: string
          id?: string
          name: string
          phone: string
          status: string
          total_courses?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          status?: string
          total_courses?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          course_day_id: string
          course_id: string
          created_at: string
          id: string
          learner_id: string
          sent_at: string
          status: string
          type: string
        }
        Insert: {
          course_day_id: string
          course_id: string
          created_at?: string
          id?: string
          learner_id: string
          sent_at?: string
          status: string
          type: string
        }
        Update: {
          course_day_id?: string
          course_id?: string
          created_at?: string
          id?: string
          learner_id?: string
          sent_at?: string
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_course_day_id_fkey"
            columns: ["course_day_id"]
            isOneToOne: false
            referencedRelation: "course_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      registration_requests: {
        Row: {
          approval_status: string | null
          created_at: string | null
          generated: boolean
          goal: string
          language: string
          name: string
          number: string
          request_id: string
          style: string
          topic: string
        }
        Insert: {
          approval_status?: string | null
          created_at?: string | null
          generated?: boolean
          goal: string
          language: string
          name: string
          number: string
          request_id?: string
          style: string
          topic: string
        }
        Update: {
          approval_status?: string | null
          created_at?: string | null
          generated?: boolean
          goal?: string
          language?: string
          name?: string
          number?: string
          request_id?: string
          style?: string
          topic?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          course_id: string
          id: string
          last_msg: string | null
          module_completed: number | null
          name: string
          next_day: number | null
          next_module: number | null
          phone: string
        }
        Insert: {
          course_id: string
          id?: string
          last_msg?: string | null
          module_completed?: number | null
          name: string
          next_day?: number | null
          next_module?: number | null
          phone: string
        }
        Update: {
          course_id?: string
          id?: string
          last_msg?: string | null
          module_completed?: number | null
          name?: string
          next_day?: number | null
          next_module?: number | null
          phone?: string
        }
        Relationships: []
      }
      user_inputs: {
        Row: {
          "Certificate File": string | null
          "completed courses": number | null
          Completion_Certificate: string | null
          "Course Completed": boolean | null
          "Course Status": string | null
          Created: string | null
          Date: string | null
          "Day Completed": number | null
          Doubt: string | null
          Feedback: string | null
          Goal: string | null
          id: number
          Interactive_Responses: Json | null
          "Join Waitlist": boolean | null
          Language: string | null
          Last_Msg: string | null
          "Module Completed": number | null
          Name: string | null
          "Next Day": string | null
          "Next Module": string | null
          Phone: string | null
          Progress: number | null
          "Question Responses": Json | null
          record_id: string | null
          Responses: Json | null
          Style: string | null
          Topic: string | null
        }
        Insert: {
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          record_id?: string | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Update: {
          "Certificate File"?: string | null
          "completed courses"?: number | null
          Completion_Certificate?: string | null
          "Course Completed"?: boolean | null
          "Course Status"?: string | null
          Created?: string | null
          Date?: string | null
          "Day Completed"?: number | null
          Doubt?: string | null
          Feedback?: string | null
          Goal?: string | null
          id?: number
          Interactive_Responses?: Json | null
          "Join Waitlist"?: boolean | null
          Language?: string | null
          Last_Msg?: string | null
          "Module Completed"?: number | null
          Name?: string | null
          "Next Day"?: string | null
          "Next Module"?: string | null
          Phone?: string | null
          Progress?: number | null
          "Question Responses"?: Json | null
          record_id?: string | null
          Responses?: Json | null
          Style?: string | null
          Topic?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          course_id: string | null
          created_at: string
          day_completed: number | null
          email: string
          id: string
          interactive_responses: string | null
          last_msg: string | null
          module_completed: number | null
          name: string
          next_day: number | null
          next_module: number | null
          phone: string | null
          question_responses: string | null
          responses: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          course_id?: string | null
          created_at?: string
          day_completed?: number | null
          email: string
          id?: string
          interactive_responses?: string | null
          last_msg?: string | null
          module_completed?: number | null
          name: string
          next_day?: number | null
          next_module?: number | null
          phone?: string | null
          question_responses?: string | null
          responses?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          course_id?: string | null
          created_at?: string
          day_completed?: number | null
          email?: string
          id?: string
          interactive_responses?: string | null
          last_msg?: string | null
          module_completed?: number | null
          name?: string
          next_day?: number | null
          next_module?: number | null
          phone?: string | null
          question_responses?: string | null
          responses?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      website_cop_courses: {
        Row: {
          created_at: string | null
          day: number
          id: string
          module_1: string | null
          module_2: string | null
          module_3: string | null
          request_id: string | null
          topic_name: string | null
        }
        Insert: {
          created_at?: string | null
          day: number
          id?: string
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          request_id?: string | null
          topic_name?: string | null
        }
        Update: {
          created_at?: string | null
          day?: number
          id?: string
          module_1?: string | null
          module_2?: string | null
          module_3?: string | null
          request_id?: string | null
          topic_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      send_scheduled_messages: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
