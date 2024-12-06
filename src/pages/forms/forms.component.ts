import { Component } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

export interface Form {
  form_id?: number; // Optional field, as indicated by Option in Rust
  company: number;
  form_type: string;
  nb_questions: number;
  template: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  constructor(private http: HttpClient, private router: Router, private authservice: AuthService) {}
  
  private apiUrl = `http://127.0.0.1:3000/forms/user/${this.authservice}`;

  forms: Form[] = [];

  ngOnInit(): void {
    this.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.apiUrl).pipe(
      map(response => response)
    );
  }

  onFormClick(form: Form): void {
    if (form.form_type === 'ESG') {
      this.router.navigate(['/forms/esg/complete'], { state: { form } });
    } else if (form.form_type === 'ODD') {
      this.router.navigate(['/forms/odd/complete'], { state: { form } });
    }
  }
}
