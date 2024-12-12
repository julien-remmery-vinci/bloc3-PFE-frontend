import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/services/form.service';
import { ScoreService } from 'src/services/score.service';
import { ScoreUpdate } from 'src/types/score.types';
import Swal from 'sweetalert2';

interface Question {
  question: {
    question_id: number;
    category: string;
    sub_category: string;
    question: string;
    is_used: boolean;
    question_type: string;
  };
  answers: Array<{
    answer_id: number;
    answer: string;
    score_now: number;
    score_commitment_pact: number;
  }>;
}

interface FormData {
  type: string;
  questions: Question[];
}

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  forms: FormData | null = null;
  expandedCategories: Set<number> = new Set();
  expandedSubCategories: Set<string> = new Set();
  expandedQuestions: Set<number> = new Set();
  successMessage: string = '';

  constructor(private formService: FormService, private scoreService:ScoreService) {}

  ngOnInit(): void {
    this.formService.getAnswers().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  getUniqueCategories(): string[] {
    if (!this.forms) return [];
    return [...new Set(this.forms.questions.map(q => q.question.category))];
  }

  getSubCategories(category: string): string[] {
    if (!this.forms) return [];
    return [...new Set(this.forms.questions
      .filter(q => q.question.category === category)
      .map(q => q.question.sub_category))];
  }

  getQuestionsForSubCategory(category: string, subCategory: string): Question[] {
    if (!this.forms) return [];
    return this.forms.questions.filter(q => 
      q.question.category === category && 
      q.question.sub_category === subCategory
    );
  }

  isCategoryExpanded(index: number): boolean {
    return this.expandedCategories.has(index);
  }

  isSubCategoryExpanded(categoryIndex: number, subCategoryIndex: number): boolean {
    return this.expandedSubCategories.has(`${categoryIndex}-${subCategoryIndex}`);
  }

  toggleCategory(index: number): void {
    if (this.expandedCategories.has(index)) {
      this.expandedCategories.delete(index);
      this.expandedSubCategories.forEach(key => {
        if (key.startsWith(`${index}-`)) {
          this.expandedSubCategories.delete(key);
        }
      });
    } else {
      this.expandedCategories.add(index);
    }
  }

  toggleSubCategory(categoryIndex: number, subCategoryIndex: number): void {
    const key = `${categoryIndex}-${subCategoryIndex}`;
    if (this.expandedSubCategories.has(key)) {
      this.expandedSubCategories.delete(key);
    } else {
      this.expandedSubCategories.add(key);
    }
  }

  toggleQuestion(questionId: number): void {
    if (this.expandedQuestions.has(questionId)) {
      this.expandedQuestions.delete(questionId);
    } else {
      this.expandedQuestions.add(questionId);
    }
  }

  isQuestionExpanded(questionId: number): boolean {
    return this.expandedQuestions.has(questionId);
  }

  errorMessages: { [answerId: number]: string } = {};

  updateScore(questionId: number, answerId: number, scoreNow?: number, scoreCommitment?: number): void {
    const scoreUpdate: ScoreUpdate = {};
    if (scoreNow !== undefined) scoreUpdate.score_now = scoreNow;
    if (scoreCommitment !== undefined) scoreUpdate.score_commitment_pact = scoreCommitment;

    if (Object.keys(scoreUpdate).length > 0) {
      this.scoreService.updateScore(answerId, scoreUpdate).subscribe(
        () => {
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
            title: "Score(s) mis à jour avec succès"
          });
          this.errorMessages[answerId] = '';
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          if (error.status === 400) {
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
              icon: "warning",
              title: "Score(s) invalide(s)"
            });
          } else {
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
              title: "Erreur lors de la mise à jour"
            });
          }
        }
      );
    }
  }

  clearError(answerId: number): void {
    this.errorMessages[answerId] = '';
  }
}