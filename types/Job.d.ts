import { Company } from "./Company";

export interface IJob {
  id: string;
  name: string;
  description: string;
  company: Company;
  created_at: Date;
  hours_per_week: number;
  salary?: number;
  requirements: string[];
  preferences: string[];
  benefits: string[];
}
