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
          id: string;
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
          id?: string;
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
          id?: string;
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
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      companies: {
        Row: {
          city: string | null;
          company_mail: string | null;
          created_at: string | null;
          description: string;
          id: string;
          lat: number | null;
          lng: number | null;
          location: unknown | null;
          logo_path: string | null;
          logo_url: string | null;
          name: string;
          user_id: string | null;
        };
        Insert: {
          city?: string | null;
          company_mail?: string | null;
          created_at?: string | null;
          description: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          location?: unknown | null;
          logo_path?: string | null;
          logo_url?: string | null;
          name: string;
          user_id?: string | null;
        };
        Update: {
          city?: string | null;
          company_mail?: string | null;
          created_at?: string | null;
          description?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          location?: unknown | null;
          logo_path?: string | null;
          logo_url?: string | null;
          name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "companies_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      fetch_job_and_company_data: {
        Args: {
          input_job_id: string;
        };
        Returns: {
          job_id: string;
          job_name: string;
          job_description: string;
          company_id: string;
          company_name: string;
          company_description: string;
          company_created_at: string;
          logo_url: string;
          logo_path: string;
          location: unknown;
          city: string;
          user_id: string;
          lat: number;
          lng: number;
          job_created_at: string;
          hours_per_week_min: number;
          hours_per_week_max: number;
          requirements: string[];
          preferences: string[];
          benefits: string[];
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
