export interface Onboarding {
    onboarding_id?: number | null;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    position: string;
    company_name: string;
    company_number: string;
    legal_form: string;
    office_address: string;
    website: string;
    nace_code: string;
    revenue: number;
    franchise: boolean;
    nb_workers: number;
    dispute: boolean;
    honor_engagement: boolean;
    grant_application: boolean;
    grant_application_partner: string;
    something_else: string;
    comment: string;
    submit_date?: string | null;
    is_owner: boolean;
    offers_services: boolean;
    sells_products: boolean;
    status?: string | null;
  }
  