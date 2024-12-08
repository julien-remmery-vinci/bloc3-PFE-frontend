import { Component } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  private apiUrl: string = `http://127.0.0.1:3000/forms/company`;
  forms: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.apiUrl).pipe(
      map(response => response)
    );
  }

  // TODO : SUPPRIMER
  exempleClick() {
    this.router.navigate([`/forms/esg/complete`], { state: { form: null } });
  }

  onFormClick(form: any): void {   
    this.router.navigate([`/forms/${form.form.type.toLowerCase()}/complete`], { state: { form } });
  }
}
