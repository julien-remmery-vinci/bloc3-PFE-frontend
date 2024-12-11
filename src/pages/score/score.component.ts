import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  forms: any;

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

  updateScore(questionId: number, answerId: number, scoreNow: number, scoreCommitment: number): void {
    // Logic to update the score
    console.log(`Updating score for question ${questionId}, answer ${answerId} to ${scoreNow}, ${scoreCommitment}`);
  }
}