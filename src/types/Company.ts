import { Form } from "./Form";

export interface Company {
    company_id?: number; // Corresponds to Option<i32>
    company_name: string;
    company_number: string;
    office_address: string;
    legal_form: string;
    website?: string; // Corresponds to Option<String>
    nace_code: string;
    business_activity: string;
    nb_workers?: number; // Corresponds to Option<i32>
    revenue?: number; // Corresponds to Option<f64>
    labels?: string[]; // Corresponds to Option<Vec<String>>
    dispute: boolean;
    forms : Form[];
  }