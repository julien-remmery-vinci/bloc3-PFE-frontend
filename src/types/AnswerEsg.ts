import {UserAnswerEsg} from "./UserAnswerEsg";

export interface AnswerEsg {
    answer_id: number;
    question_id: number;
    template: string;
    answer?: UserAnswerEsg;
    score_now: number;
    score_commitment_pact?: number;
    is_forced_engagement: boolean;
    is_forced_comment: boolean;
}
