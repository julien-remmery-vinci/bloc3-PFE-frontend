import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/services/form.service';
import { ScoreService } from 'src/services/score.service';
import { ScoreUpdate } from 'src/types/score.types';

import { Router } from '@angular/router';
import { Score } from 'src/types/Score';

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
  selector: 'app-score-review',
  templateUrl: './scoreReview.component.html',
  styleUrls: ['./scoreReview.component.css']
})
export class ScoreReviewComponent implements OnInit {
  forms: FormData | null = null;
  expandedCategories: Set<number> = new Set();
  expandedSubCategories: Set<string> = new Set();
  expandedQuestions: Set<number> = new Set();
  successMessage: string = '';
  errorMessage: string = '';
  score : Score;

  constructor(private formService: FormService, private scoreService:ScoreService, private router : Router) {
    
    const navigation = this.router.getCurrentNavigation();
    this.score = navigation?.extras?.state?.['score'];
  }

  ngOnInit(): void {
    console.log("MON SCORE ", this.score)
    this.formService.getAnswers().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  sommeScoreActuel(category : any): number{
   let total=0
    this.score.details_now.forEach(e => {
      if (e.sub_category.charAt(0) === category.charAt(0)) {
      total += e.score!
    }  
  });
  return Math.round(total);
  }
  sommeScoreFutur(category : any): number{
    let total=0
    this.score.details_commitment_pact.forEach(e => {
      console.log(category)
      if (e.sub_category.charAt(0) === category.charAt(0)) {
      total += e.score!
    }
  });
  
  return Math.round(total);
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
          this.successMessage = "Score(s) mis à jour avec succès";
          this.errorMessages[answerId] = '';
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          if (error.status === 400) {
            this.errorMessages[answerId] = "Score(s) invalide(s)";
          } else {
            this.errorMessages[answerId] = "Erreur lors de la mise à jour";
          }
        }
      );
    }
  }

  clearError(answerId: number): void {
    this.errorMessages[answerId] = '';
  }
}