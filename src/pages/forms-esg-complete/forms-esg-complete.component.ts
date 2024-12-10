import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import { CommonModule } from '@angular/common';
import {QuestionWithAnswer} from "../../types/QuestionWithAnswer";
import {ThemeService} from "../../app/theme/theme.service";
import {FormsModule} from "@angular/forms";
import {ResponseService} from "../../services/response.service";


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
  questions: QuestionWithAnswer[] = []; // Array of questions
  selectedQuestion: QuestionWithAnswer | null = null; // Selected question
  public selectedAnswerIds: Set<number> = new Set<number>(); // Set to store selected answer IDs
  public selectedAnswerId: number | null = null; // Store the selected answer ID

  // TODO : Recuperer les questions de l'API
  public selectedCategory :any = null ;
      constructor(private router: Router, protected themeService:ThemeService,private responseService:ResponseService) {
      const navigation = this.router.getCurrentNavigation();
      this.form = navigation?.extras?.state?.['form'];
      this.questions = this.form.questions;
      this.selectedQuestion = this.questions[0];
      this.selectedAnswerIds.clear();
      this.updateSelectedAnswerId();

      if(this.selectedQuestion?.user_answers){
        for (const answer of this.selectedQuestion.user_answers) {
          this.selectedAnswerIds.add(answer.answer_id);
        }
      }
      console.log(this.form)
  }
  updateSelectedAnswerId() {
    if (this.selectedQuestion?.user_answers && this.selectedQuestion.user_answers.length > 0) {
      this.selectedAnswerId = this.selectedQuestion.user_answers[0].answer_id;
    } else {
      this.selectedAnswerId = null;
    }
  }
  private saveQuestion(question:QuestionWithAnswer) {
    //this.responseService.sendAnswerById(question)
  }
  selectQuestion(question: any) {
      //  this.saveQuestion();
        this.selectedQuestion = question;
        this.selectedAnswerIds.clear();
        this.updateSelectedAnswerId();
        console.log(this.selectedQuestion)

        if(this.selectedQuestion?.user_answers){
          for (const answer of this.selectedQuestion.user_answers) {
            this.selectedAnswerIds.add(answer.answer_id);
          }
        }
        console.log(this.selectedAnswerIds)
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
