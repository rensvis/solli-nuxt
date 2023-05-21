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
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  start_date: string;
  age: number;
  motivation: string;
  resume_url: string;
  resume_path: string;
}
