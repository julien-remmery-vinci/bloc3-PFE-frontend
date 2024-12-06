import { Component } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/types/User';
import { Form } from 'src/types/Form';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  private user: User | null = null;
  private apiUrl!: string;
  private userSubscription!: Subscription;
  forms: Form[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authservice.user.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.apiUrl = `http://127.0.0.1:3000/forms/user/${this.user.user_id}`;
      }
    });
    this.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.apiUrl).pipe(
      map(response => response)
    );
  }

  // TODO : SUPPRIMER
  exempleClick() {
    this.router.navigate([`/forms/esg/complete`], { state: { form: null } });
  }

  onFormClick(form: Form): void {
    this.router.navigate([`/forms/${form.form_type.toLowerCase()}/complete`], { state: { form } });
  }
}
