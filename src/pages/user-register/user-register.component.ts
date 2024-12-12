import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }

    const loggedInUser = this.authService.getCurrentUser();
    const formValues = {
      ...this.registerForm.value,
      role: 'user',
      company_id: loggedInUser?.company_id || null,
    };

    this.authService.registerUser(formValues).subscribe(
      (response: { message: string }) => {
        this.successMessage = "L'inscription a réussi !";
        this.errorMessage = '';

        this.registerForm.reset();
        this.submitted = false;
      },
      (error: any) => {
        this.successMessage = '';
        if (error.status === 409) {
          this.errorMessage = "L'email est déjà utilisé.";
        } else if (error.status === 400) {
          this.errorMessage = "Les données fournies sont invalides.";
        } else {
          this.errorMessage = "Une erreur s'est produite. Réessayez plus tard.";
        }
        console.error('Erreur API :', error);
      }
    );
  }
}