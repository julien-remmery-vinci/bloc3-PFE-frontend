import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      company_id: [''],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Arrêtez si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    // Appel à l'API pour l'enregistrement
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response: { message: string }) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        console.log('Réponse de l’API :', response);
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de l'enregistrement.";
        this.successMessage = '';
        console.error('Erreur API :', error);
      }
    );
  }
}