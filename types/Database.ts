// supabase gen types typescript supabase gen types typescript --project-id mplhacmxlgtgtrfcqjnx

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          age: number | null;
          created_at: string | null;
          email: string;
          first_name: string;
          id: number;
          job_id: string;
          last_name: string | null;
          motivation: string;
          phone_number: string;
          resume_path: string | null;
          resume_url: string | null;
          start_date: string | null;
          user_id: string | null;
          viewed: boolean;
        };
        Insert: {
          age?: number | null;
          created_at?: string | null;
          email: string;
          first_name: string;
          id?: number;
          job_id: string;
          last_name?: string | null;
          motivation: string;
          phone_number: string;
          resume_path?: string | null;
          resume_url?: string | null;
          start_date?: string | null;
          user_id?: string | null;
          viewed?: boolean;
        };
        Update: {
          age?: number | null;
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: number;
          job_id?: string;
          last_name?: string | null;
          motivation?: string;
          phone_number?: string;
          resume_path?: string | null;
          resume_url?: string | null;
          start_date?: string | null;
          user_id?: string | null;
          viewed?: boolean;
        };
      };
      companies: {
        Row: {
          city: string | null;
          created_at: string | null;
          description: string;
          id: string;
          location: unknown | null;
          logo_url: string | null;
          name: string;
          user_id: string | null;
        };
        Insert: {
          city?: string | null;
          created_at?: string | null;
          description: string;
          id?: string;
          location?: unknown | null;
          logo_url?: string | null;
          name: string;
          user_id?: string | null;
        };
        Update: {
          city?: string | null;
          created_at?: string | null;
          description?: string;
          id?: string;
          location?: unknown | null;
          logo_url?: string | null;
          name?: string;
          user_id?: string | null;
        };
      };
      jobs: {
        Row: {
          benefits: string[] | null;
          company_id: string;
          created_at: string | null;
          description: string;
          hours_per_week_max: number | null;
          hours_per_week_min: number;
          id: string;
          name: string;
          preferences: string[] | null;
          requirements: string[] | null;
        };
        Insert: {
          benefits?: string[] | null;
          company_id: string;
          created_at?: string | null;
          description: string;
          hours_per_week_max?: number | null;
          hours_per_week_min: number;
          id?: string;
          name: string;
          preferences?: string[] | null;
          requirements?: string[] | null;
        };
        Update: {
          benefits?: string[] | null;
          company_id?: string;
          created_at?: string | null;
          description?: string;
          hours_per_week_max?: number | null;
          hours_per_week_min?: number;
          id?: string;
          name?: string;
          preferences?: string[] | null;
          requirements?: string[] | null;
        };
      };
      users: {
        Row: {
          dob: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number: string | null;
          role: string | null;
        };
        Insert: {
          dob?: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number?: string | null;
          role?: string | null;
        };
        Update: {
          dob?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone_number?: string | null;
          role?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
