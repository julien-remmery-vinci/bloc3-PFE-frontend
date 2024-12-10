import {AnswerEsg} from "./AnswerEsg";

export interface Question {
    question_id: number;
    category: string;
    sub_category: string;
    question: string;
    is_used: boolean;
    question_type: "ODD" | "ESG";
    answers :  AnswerEsg[]
}
