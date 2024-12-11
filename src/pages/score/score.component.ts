// score.component.ts
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/services/form.service';

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

  constructor(private formService: FormService) {}

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
      // Close all related subcategories
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

  updateScore(questionId: number, answerId: number, scoreNow: number, scoreCommitment: number): void {
    console.log(`Updating score for question ${questionId}, answer ${answerId} to ${scoreNow}, ${scoreCommitment}`);
    // Implement score update logic here
  }
}