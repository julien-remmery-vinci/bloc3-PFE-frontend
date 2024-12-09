import {Template} from "./template";
import {Question} from "./Question";

export interface Form {
    form_id?: number;
    company_id: number;
    type: string;
    template: Template[]
    questions: Question[]
}