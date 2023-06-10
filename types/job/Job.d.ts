import { Company } from "../Company";

export interface IJob {
  id: string;
  name: string;
  description: string;
  company_id: string;
  company: Company;
  created_at: Date;
  hours_per_week_min: number;
  hours_per_week_max: number | null;
  requirements: string[] | null;
  preferences: string[] | null;
  benefits: string[] | null;
}
