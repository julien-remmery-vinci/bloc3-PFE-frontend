import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import { CommonModule } from '@angular/common';
import {QuestionWithAnswer} from "../../types/QuestionWithAnswer";
import {ThemeService} from "../../app/theme/theme.service";
import {FormsModule} from "@angular/forms";
import {ResponseService} from "../../services/response.service";
import {AnswerPayload} from "../../types/answer-payload";
import {AnswerPayloadCommentOnly} from "../../types/answer-payloadCommentOnly";
import * as events from "node:events";
import {FormService} from "../../services/form.service";


@Component({
  selector: 'app-forms-esg-complete',
  templateUrl: './forms-esg-complete.component.html',
  styleUrls: ['./forms-esg-complete.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class FormsEsgCompleteComponent {
  public form: Form;
  public formEnd = false;
  questions: QuestionWithAnswer[] = [];
  selectedQuestion: QuestionWithAnswer | null = null;
  public selectedAnswerIds: Set<number> = new Set<number>();
  public selectedAnswerId: number | null = null;
  public selectedAnswerComment: string[] = []
  public selectedCategory :any = null ;
  public isAnswerModified :boolean[] = [false];
  public isNow : string[] = []
  public isCommitment : string[] = [];
  constructor(private router: Router, protected themeService:ThemeService,private responseService:ResponseService) {
      const navigation = this.router.getCurrentNavigation();
      this.form = navigation?.extras?.state?.['form'];
      this.questions = this.form.questions;
      this.selectedQuestion = this.questions[0];
      this.selectedAnswerIds.clear();
      this.updateSelectedAnswerId();

  }
  onAnswerChange(answer_id: number) {
      this.isAnswerModified[answer_id] = true;
  }
  onCommitmentChange(answer_id: number,event:Event) {
      this.isAnswerModified[answer_id] = true;
      const checkbox = event.target as HTMLInputElement;
      if(!checkbox.checked){
          this.isCommitment[answer_id] = "";
      }
      else{
          this.isCommitment[answer_id] = "commitment_pact"
      }
  }
  onChange(answer_id: number,event:Event) {
      this.isAnswerModified[answer_id] = true;
      const checkbox = event.target as HTMLInputElement;
      if(!checkbox.checked){
          this.isNow[answer_id] = "";
      }
      else{
          this.isNow[answer_id] = "now"
      }
  }
  updateSelectedAnswerId() {
    if (this.selectedQuestion?.user_answers && this.selectedQuestion.user_answers.length > 0) {
        for (const answer of this.selectedQuestion.user_answers) {
            if(answer.commitment_pact || answer.now){
                this.selectedAnswerIds.add(answer.answer_id);
            }
            if(answer.comment){
                this.selectedAnswerComment[answer.answer_id] = answer.comment
            }

            if(answer.now){
                this.isNow[answer.answer_id] = "now"
            }

            if(answer.commitment_pact){
                this.isCommitment[answer.answer_id] ="commitment_pact"
            }
        }
    } else {
        this.selectedAnswerIds.clear()
        this.selectedAnswerId = null;
        this.selectedAnswerComment = [];
        this.isNow = [];
        this.isCommitment = [];
    }
  }

  private saveQuestion(question:QuestionWithAnswer) {
    if(this.form && this.form.form_id ){
        for (const answer of question.answers){
            if(this.isAnswerModified[answer.answer_id]){

                const answerPayload: AnswerPayload = {
                    form_id: this.form.form_id,
                    now: this.isNow[answer.answer_id] == "now",
                    commitment_pact: this.isCommitment[answer.answer_id]=="commitment_pact",
                    comment: this.selectedAnswerComment[answer.answer_id]

                };
                console.log("JE SAVE QUESTIONS")
                this.responseService.sendAnswerById(answerPayload,question.question.question_id)
            }
        }
        /*
        if(this.selectedQuestion?.answers[0].answer == null){
            const answerPayload: AnswerPayloadCommentOnly = {
                form_id: this.form.form_id,
                comment: this.selectedAnswerComment
            };
            this.responseService.sendAnswerCommentOnlyById(answerPayload,question.question.question_id)
        }
        else{
            const answerPayload: AnswerPayload = {
                form_id: this.form.form_id,
                now: isNow[answer_id],
                commitment_pact: isCommitment[answer_id],
                comment: this.selectedAnswerComment
            };

            this.responseService.sendAnswerById(answerPayload,question.question.question_id)
        }

         */
    }
  }

  selectQuestion(question: any) {
    if(this.selectedQuestion){
       this.saveQuestion(this.selectedQuestion);
    }
    this.isAnswerModified = [false];
    this.selectedQuestion = question;
    this.selectedAnswerIds.clear();
    this.selectedAnswerComment = [];
    this.isNow = [];
    this.isCommitment = [];
    this.updateSelectedAnswerId();

    if(this.form && this.questions && this.selectedQuestion) {
      const index = this.questions.indexOf(this.selectedQuestion);
      if (index + 1 === this.questions.length) {
        this.formEnd = true;
      } else {
        this.formEnd = false;
      }
    }
  }

  // TODO : Envoyer la réponse à l'API
  nextQuestion(answer: any) {
    if(this.form && this.questions && this.selectedQuestion){
      const index = this.questions.indexOf(this.selectedQuestion);
      this.selectQuestion(this.questions[index + 1]);
    }
  }

  submitForm(form: Form) {
    alert('A implementer');
  }



}
