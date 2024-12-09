interface AnswerEsg {
    answer_id: number;
    question_id: number;
    template: string;
    answer?: string;
    score_now: number;
    score_commitment_pact?: number;
    is_forced_engagement: boolean;
}
