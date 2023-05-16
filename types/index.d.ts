// declare global {
//   interface ICompany {
//     id: string;
//     name: string;
//     description: string;
//     createdAt: Date;
//     logoUrl: string;
//     location: any;
//     city: string;
//     userId: string;
//   }

//   interface IJob {
//     id: string;
//     name: string;
//     description: string;
//     company: Company;
//     cretedAt: Date;
//     hoursPerWeek: number;
//     salary?: number;
//     requirements: string[];
//     preferences: string[];
//     benefits: string[];
//   }
// }
// export {};

interface ICompany {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  logo_url: string;
  location: any;
  user_id: string;
  userId: string;
  city: string;
}

interface IJob {
  id: string;
  name: string;
  description: string;
  company: ICompany;
  created_at: Date;
  hours_per_week_min: number;
  hours_per_week_max: number;
  salary?: number;
  requirements: string[];
  preferences: string[];
  benefits: string[];
}

export { ICompany, IJob };
