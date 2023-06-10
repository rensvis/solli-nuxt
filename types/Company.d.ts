export interface ICompany {
  id: string;
  name: string;
  description: string;
  created_at: string | null;
  logo_url: string | null;
  logo_path: string | null;
  location: any;
  city: string | null;
  user_id: string | null;
  company_mail: string | null;
  lat: number | null;
  lng: number | null;
}
