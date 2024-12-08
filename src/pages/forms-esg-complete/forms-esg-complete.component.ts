import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forms-esg-complete',
  templateUrl: './forms-esg-complete.component.html',
  styleUrls: ['./forms-esg-complete.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class FormsEsgCompleteComponent {
  public form: Form;
  public formEnd = false;

  // TODO : Recuperer les questions de l'API
  public questions = [
    {category: 'Exemple de catégorie', text: 'Questions exemple n°1', answers: ['Exemple de réponse 1', 'Exemple de réponse 2', 'Exemple de réponse 3']},
    {category: 'Exemple de catégorie', text: 'Questions exemple n°2', answers: ['Exemple de réponse 1', 'Exemple de réponse 2', 'Exemple de réponse 3']},
    {category: 'Exemple de catégorie', text: 'Questions exemple n°3', answers: ['Exemple de réponse 1', 'Exemple de réponse 2', 'Exemple de réponse 3']},
  ];

  public selectedQuestion = this.questions[0];
  
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.form = navigation?.extras?.state?.['form'];
  }

  selectQuestion(question: any) {
    this.selectedQuestion = question;
  }

  // TODO : Envoyer la réponse à l'API
  nextQuestion(answer: any) {
    const index = this.questions.indexOf(this.selectedQuestion);
    this.selectedQuestion = this.questions[index + 1];
    if (index + 1 === this.questions.length - 1) {
      this.formEnd = true;
    }
  }

  submitForm(form: Form) {
    alert('A implementer');
  }
}
