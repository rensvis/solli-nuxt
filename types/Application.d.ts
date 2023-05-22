export interface IApplicationFormValue {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  start_date: string;
  age: number;
  motivation: string;
  resume: File;
}

export interface IApplication {
  job_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  start_date: string;
  age: number;
  motivation: string;
  resume_url: string;
  resume_path: string;
  created_at: string;
}
