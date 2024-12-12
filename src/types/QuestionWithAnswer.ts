import {AnswerEsg} from "./AnswerEsg";
import {Question} from "./Question";
import {UserAnswerEsg} from "./UserAnswerEsg";

export interface QuestionWithAnswer {
    question : Question
    answers: AnswerEsg[]
    user_answers: UserAnswerEsg[]
    isUnanswered : boolean
}
