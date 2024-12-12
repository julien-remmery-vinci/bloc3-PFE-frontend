import {Template} from "./template";
import {QuestionWithAnswer} from "./QuestionWithAnswer";

export interface Form {
    form_id?: number;
    company_id: number;
    type: string;
    template: Template[]
    questions: QuestionWithAnswer[]
    status: string;
}