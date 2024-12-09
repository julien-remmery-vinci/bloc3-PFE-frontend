// src/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  forms: any[] = [];
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private formService: FormService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage();
    const token = this.authService.getToken();
    if (token) {
    this.formService.getUserForms(token).subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    console.log(this.forms);
  } else {
    this.error = 'Pas de token';
    this.router.navigate(['/login']);
  }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  calculateProgress(form: any): number {
    const totalQuestions = form.questions.length;
    const completedQuestions = form.questions.filter((q: any) => q.user_answers.length > 0).length;
    return (completedQuestions / totalQuestions) * 100;
  }

}