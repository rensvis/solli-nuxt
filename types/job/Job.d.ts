import { Company } from "../Company";

export interface IJob {
  id: string;
  name: string;
  description: string;
  company_id: string;
  company?: Company;
  company_name: string;
  company_logo_url: string;
  company_city: string;
  created_at: Date;
  hours_per_week_min: number;
  hours_per_week_max: number | null;
  requirements: string[] | null;
  preferences: string[] | null;
  benefits: string[] | null;
  distance_meters?: number;
}
