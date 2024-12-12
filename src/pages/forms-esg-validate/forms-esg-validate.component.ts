import {ChangeDetectorRef, Component} from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import { CommonModule } from '@angular/common';
import {QuestionWithAnswer} from "../../types/QuestionWithAnswer";
import {ThemeService} from "../../app/theme/theme.service";
import {FormsModule} from "@angular/forms";
import {ResponseService} from "../../services/response.service";
import {FormService} from "../../services/form.service";
import { AnswerValidationPayload } from 'src/types/answer-validation-payload';
import { AnswerPayloadCommentOnlyValidationPayload } from 'src/types/answer-comment-validation-payload';
import {CompanyService} from "../../services/company.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forms-esg-validate',
  templateUrl: './forms-esg-validate.component.html',
  styleUrls: ['./forms-esg-validate.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class FormsEsgValidateComponent {
  public form: Form;
  public formEnd = false;
  public questions: QuestionWithAnswer[] = [];
  selectedQuestion: QuestionWithAnswer | null = null;
  public selectedAnswerIds: Set<number> = new Set<number>();
  public selectedAnswerId: number | null = null;
  public selectedAnswerComment: string[] = []
  public isAnswerModified :boolean[] = [false];
  public isNow : string[] = []
  public isCommitment : string[] = [];
  public questionIsValidated: boolean | undefined = false;
  groupedQuestions: any = {};
  openCategories: Set<string> = new Set(); // Track which categories are open
  openSubCategories: Map<string, Set<string>> = new Map(); // Track which subcategories are open per category

    constructor(private router: Router,
                protected themeService:ThemeService,
                private responseService:ResponseService,
                private formSerice:FormService,
                private cdr: ChangeDetectorRef,
                private companyService:CompanyService) {
      const navigation = this.router.getCurrentNavigation();
      this.form = navigation?.extras?.state?.['form'];
      this.questions = this.form.questions;
      this.selectedQuestion = this.questions[this.getLatestNotValidatedQuestion()];
      this.selectedAnswerIds.clear();
      this.updateDisplayOfAnswer();
      this.findAllCategory();     
      this.questionIsValidated = this.selectedQuestion.user_answers.some((userAnswer) => userAnswer.status === "VALIDATED");
  }
  onAnswerChange(answer_id: number) {
      this.isAnswerModified[answer_id] = true;
  }
  onCommitmentChange(answer_id: number,event:Event,forcedEngagement: boolean) {
      this.isAnswerModified[answer_id] = true;
      const checkbox = event.target as HTMLInputElement;
      if(!checkbox.checked){
          this.isCommitment[answer_id] = "";
      }
      else{
          this.isCommitment[answer_id] = "commitment_pact"
          if(!forcedEngagement) {
              this.isNow[answer_id] = ""
          }
      }
  }

  onChange(answer_id: number,event:Event,forcedEngagement: boolean) {
      this.isAnswerModified[answer_id] = true;
      const checkbox = event.target as HTMLInputElement;
      if(!checkbox.checked){
          this.isNow[answer_id] = "";
      }
      else{
          this.isNow[answer_id] = "now"
          if(!forcedEngagement){
              this.isCommitment[answer_id]= ""
          }
      }
  }

  updateDisplayOfAnswer() {
    if (this.selectedQuestion?.user_answers && this.selectedQuestion.user_answers.length > 0) {
        for (const answer of this.selectedQuestion.user_answers) {
            if(answer.commitment_pact || answer.now){
                this.selectedAnswerIds.add(answer.answer_id);
            }
            if(answer.comment){
                this.selectedAnswerComment[answer.answer_id] = answer.comment
            }
            if(answer.status == "VALIDATED"){
                if(answer.now_verif)
                this.isNow[answer.answer_id] = "now"
            }
            else{
                if(answer.now){
                    this.isNow[answer.answer_id] = "now"
                }
            }
            if(answer.status == "VALIDATED"){
                if(answer.commitment_pact_verif)
                    this.isCommitment[answer.answer_id] = "commitment_pact"
            }
            else{
                if(answer.commitment_pact){
                    this.isCommitment[answer.answer_id] ="commitment_pact"
                }
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
            // if(this.isAnswerModified[answer.answer_id]){
                if(!answer.is_forced_comment){
                    const answerPayload: AnswerValidationPayload = {
                        form_id: this.form.form_id,
                        now_verif: this.isNow[answer.answer_id] == "now",
                        commitment_pact_verif: this.isCommitment[answer.answer_id]=="commitment_pact",
                        comment : this.selectedAnswerComment[answer.answer_id]

                    };
                    this.responseService.sendAnswerValidationById(answerPayload, answer.answer_id).subscribe(
                        (response) => {
                            const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                            });
                            Toast.fire({
                            icon: "success",
                            title: "Validation enregistrée"
                            });                            
                                this.companyService.getForms(this.form.company_id).subscribe(//formSerice.getUserForms().subscribe(
                                    (response) =>{
                                        const forms : Form[] = response.forms
                                        for (const formU of forms){
                                            if(formU.form_id == this.form.form_id){
                                                this.form = formU
                                                this.questions = this.form.questions;
                                                this.findAllCategory()
                                                this.cdr.detectChanges();  // Trigger change detection
                                            }
                                        }
                                    }
                                )
                        },
                        (error) => {
                            const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                            });
                            Toast.fire({
                            icon: "error",
                            title: "Erreur lors de la validation"
                            });  
                        }
                    )
                }
                else {
                    const answerPayload: AnswerPayloadCommentOnlyValidationPayload = {
                        form_id: this.form.form_id,
                        comment: this.selectedAnswerComment[answer.answer_id]
                    };
                    this.responseService.sendAnswerCommentOnlyValidationById(answerPayload,answer.answer_id).subscribe(
                        () => {
                            this.companyService.getForms(this.form.company_id).subscribe(//formSerice.getUserForms().subscribe(
                                (response) =>{
                                    const forms : Form[] = response.forms
                                    for (const formU of forms){
                                        if(formU.form_id == this.form.form_id){
                                            this.form = formU
                                            this.questions = this.form.questions;
                                            this.findAllCategory()
                                            this.cdr.detectChanges();  // Trigger change detection
                                        }
                                    }
                                }
                            )
                        }
                    )
                }
            // }
        }
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
    this.updateDisplayOfAnswer();
    this.questionIsValidated = this.selectedQuestion?.user_answers.some((userAnswer) => userAnswer.status === "VALIDATED");

    if(this.form && this.questions && this.selectedQuestion) {
      const index = this.questions.indexOf(this.selectedQuestion);
      if (index + 1 === this.questions.length) {
        this.formEnd = true;
      } else {
        this.formEnd = false;
      }
    }
  }

  nextQuestion(answer: any) {
    if(this.form && this.questions && this.selectedQuestion){
      const index = this.questions.indexOf(this.selectedQuestion);
      if (index == -1) {
        this.formEnd = true;
        return;
      }
      this.selectQuestion(this.questions[index + 1]);
    }
  }

  submitForm(form: Form) {
    this.formSerice.validateForm(form.form_id).subscribe(
        (response) => {
            const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
            });
            Toast.fire({
            icon: "success",
            title: "Questionnaire validé"
            });  
            this.router.navigate(['/dashboard']);
        },
        (error) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
                });
                Toast.fire({
                icon: "error",
                title: "Erreur lors de la validation"
                });  
            console.error('Error occurred:', error);
        }
    )
  }

    getCategories(): string[] {
        return Object.keys(this.groupedQuestions);
    }

    // Get all subcategories for a specific category
    getSubCategories(category: string): string[] {
        return Object.keys(this.groupedQuestions[category]);
    }

    getQuestionsByCategoryAndSubCategory(category: string, subCategory: string): QuestionWithAnswer[] {
        return this.groupedQuestions[category][subCategory] || [];
    }

    private findAllCategory() {
        this.groupedQuestions = [];
        this.form.questions.forEach(question => {
            const category = question.question.category;
            const subCategory = question.question.sub_category;

            if (!this.groupedQuestions[category]) {
                this.groupedQuestions[category] = {};
            }

            if (!this.groupedQuestions[category][subCategory]) {
                this.groupedQuestions[category][subCategory] = [];
            }
            this.groupedQuestions[category][subCategory].push(question);
        });
    }
    toggleCategory(category: string) {
        const subCategorySet = this.openSubCategories.get(category) || new Set();

        if (this.openCategories.has(category)) {
            this.openCategories.delete(category); // Close if already open
        } else {
            this.openCategories.clear()
            subCategorySet.clear()
            this.openCategories.add(category); // Open if not
        }
    }

    // Check if a category is open
    isCategoryOpen(category: string): boolean {
        return this.openCategories.has(category);
    }

    // Toggle the subcategory (open/close)
    toggleSubCategory(category: string, subCategory: string) {
        const subCategorySet = this.openSubCategories.get(category) || new Set();
        if (subCategorySet.has(subCategory)) {
            subCategorySet.delete(subCategory); // Close if already open
        } else {
            subCategorySet.clear()
            subCategorySet.add(subCategory); // Open if not
        }
        this.openSubCategories.set(category, subCategorySet);
    }

    isSubCategoryOpen(category: string, subCategory: string): boolean {
        const subCategorySet = this.openSubCategories.get(category);
        return subCategorySet ? subCategorySet.has(subCategory) : false;
    }
    private getLatestNotValidatedQuestion(): number {
        const index = this.form.questions.findIndex((question) =>
            question.user_answers.some((userAnswer) => userAnswer.status === "PENDING")
        );
        return index;
    }
}
