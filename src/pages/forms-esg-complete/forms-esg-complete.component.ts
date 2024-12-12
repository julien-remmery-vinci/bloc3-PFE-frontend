import {ChangeDetectorRef, Component} from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import { CommonModule } from '@angular/common';
import {QuestionWithAnswer} from "../../types/QuestionWithAnswer";
import {ThemeService} from "../../app/theme/theme.service";
import {FormsModule} from "@angular/forms";
import {ResponseService} from "../../services/response.service";
import {AnswerPayload} from "../../types/answer-payload";
import {AnswerPayloadCommentOnly} from "../../types/answer-payloadCommentOnly";
import {FormService} from "../../services/form.service";
import {SubmitValidation} from "../../types/SubmitValidation";
import Swal from 'sweetalert2';


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
  public questions: QuestionWithAnswer[] = [];
  selectedQuestion: QuestionWithAnswer | null = null;
  public selectedAnswerIds: Set<number> = new Set<number>();
  public selectedAnswerId: number | null = null;
  public selectedAnswerComment: string[] = []
  public isAnswerModified :boolean[] = [false];
  public isNow : string[] = []
  public isCommitment : string[] = [];
  groupedQuestions: any = {};
  openCategories: Set<string> = new Set(); // Track which categories are open
  openSubCategories: Map<string, Set<string>> = new Map(); // Track which subcategories are open per category

    constructor(private router: Router,
                protected themeService:ThemeService,
                private responseService:ResponseService,
                private formSerice:FormService,
                private cdr: ChangeDetectorRef) {
      const navigation = this.router.getCurrentNavigation();
      this.form = navigation?.extras?.state?.['form'];
        this.form.questions.sort((a, b) => {
            if (a.question.question_id < b.question.question_id) {
                return -1;
            } else if (a.question.question_id > b.question.question_id) {
                return 1;
            } else {
                return 0;
            }
        });

      this.questions = this.form.questions;
      this.selectedQuestion = this.questions[this.getLatestAnsweredQuestion()];//this.getLatestAnsweredQuestion() //
      this.selectedAnswerIds.clear();
      this.updateSelectedAnswerId();
      this.findAllCategory()
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
                if(!answer.is_forced_comment){
                    const answerPayload: AnswerPayload = {
                        form_id: this.form.form_id,
                        now: this.isNow[answer.answer_id] == "now",
                        commitment_pact: this.isCommitment[answer.answer_id]=="commitment_pact",
                        comment: this.selectedAnswerComment[answer.answer_id]
                    };
                    this.responseService.sendAnswerById(answerPayload,answer.answer_id).subscribe(
                        (response) => {
                                this.formSerice.getUserForms().subscribe(
                                    (response) =>{
                                        const forms : Form[] = response
                                        for (const formU of forms ){
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
                            console.error('Error occurred:', error);
                        }
                    )
                }
                else {
                    const answerPayload: AnswerPayloadCommentOnly = {
                        form_id: this.form.form_id,
                        comment: this.selectedAnswerComment[answer.answer_id]

                    };
                    this.responseService.sendAnswerCommentOnlyById(answerPayload,answer.answer_id).subscribe(
                        () => {
                            this.formSerice.getUserForms().subscribe(
                                (response) =>{
                                    const forms : Form[] = response
                                    for (const formU of forms ){
                                        if(formU.form_id == this.form.form_id){
                                            this.form = formU
                                            this.questions = this.form.questions;
                                            this.findAllCategory()
                                            this.cdr.detectChanges();
                                        }
                                    }
                                }
                            )
                        }
                    )
                }
            }
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

  nextQuestion(answer: any) {
    if(this.form && this.questions && this.selectedQuestion){
      const index = this.questions.indexOf(this.selectedQuestion);
      this.selectQuestion(this.questions[index + 1]);
    }
  }

  submitForm() {
      let confirmation: SubmitValidation = {
          confirmation: false
      };
      console.log("test");
      
      if(this.form && this.form.form_id){
          this.formSerice.submitForm(this.form.form_id,confirmation).subscribe(
              (response) => {
                  console.log("success")
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
                    title: "Questionnaire envoyé"
                    });
                    this.router.navigate(['/home']);
              },
              (error) => {
                  console.log(error)
                  this.showModal()
              })
      }
  }
    showModal() {
        Swal.fire({
            title: 'Reponses manquantes',
            text: 'Il reste des questions sans réponses, voulez vous quand même envoyer le formulaire ?',
            icon: 'warning',
            confirmButtonText: 'Oui',
            showCancelButton: true,
            cancelButtonText: 'Revenir au questionnaire',
            background : '#013238',
            color : 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                this.forceSubmitForm()
            }
        });
    }
  forceSubmitForm() {
      let confirmation: SubmitValidation = {
          confirmation: true
      };
      if(this.form && this.form.form_id){
        
          this.formSerice.submitForm(this.form.form_id,confirmation).subscribe(
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
                    title: "Questionnaire envoyé"
                }); 
                this.router.navigate(['/home']);
            },
            (error) => {
                console.log(error)
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
                title: "Error lors de l'envoie du questionnaire"
                });
            }
          )
      }
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
            this.openCategories.delete(category);
        } else {
            this.openCategories.clear()
            subCategorySet.clear()
            this.openCategories.add(category);
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
            subCategorySet.delete(subCategory);
        } else {
            subCategorySet.clear()
            subCategorySet.add(subCategory);
        }
        this.openSubCategories.set(category, subCategorySet);
    }

    isSubCategoryOpen(category: string, subCategory: string): boolean {
        const subCategorySet = this.openSubCategories.get(category);
        return subCategorySet ? subCategorySet.has(subCategory) : false;
    }

    private getLatestAnsweredQuestion(): number {
        const index = this.form.questions.findIndex((question) => question.user_answers.length == 0);
        return index;
    }
}
