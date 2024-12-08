export interface User {
    user_id: number;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    company_id?: number;
  }