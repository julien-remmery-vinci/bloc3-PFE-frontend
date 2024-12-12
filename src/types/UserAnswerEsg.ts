export interface UserAnswerEsg {
    answer_id: number;
    user_id: number;
    form_id: number;
    answer?: string;
    now: boolean;
    commitment_pact: boolean;
    comment?: string;
    now_verif?: boolean;
    commitment_pact_verif?: boolean;
    status:string
}
