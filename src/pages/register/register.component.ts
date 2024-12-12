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
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      company_id: [''],
    });

    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      const companyIdControl = this.registerForm.get('company_id');
      if (role === 'user') {
        companyIdControl?.setValidators([Validators.required]);
      } else {
        companyIdControl?.clearValidators();
      }
      companyIdControl?.updateValueAndValidity();
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      if (
        this.registerForm.get('role')?.value === 'user' &&
        !this.registerForm.get('company_id')?.value
      ) {
        this.errorMessage = "Un utilisateur doit avoir l'id de l'entreprise.";
      } else {
        this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      }
      return;
    }
  
    let formValues = { ...this.registerForm.value };
    if (!formValues.company_id) {
      formValues.company_id = null;
    }
  
    this.authService.registerUser(formValues).subscribe(
      (response: { message: string }) => {
        this.successMessage = "Votre compte a été créé avec succès.";
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
        console.error('API Error:', error);
      }
    );
  }  
}