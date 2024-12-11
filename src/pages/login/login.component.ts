import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {LoadingService} from "../../services/loading.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder,protected authService: AuthService, private router: Router,private loadingService:LoadingService) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let loginData = { ...this.loginForm.value };

    if (loginData.login && loginData.password) {
      this.loadingService.showLoading()
      this.authService.login(loginData.login, loginData.password).subscribe(
          (response: { message: string }) => {
            this.successMessage = response.message;
            this.errorMessage = '';
            setTimeout(() => this.loadingService.hideLoading(), 1100);
            this.router.navigate(['/home']);
          },
          (error: any) => {
            setTimeout(() => this.loadingService.hideLoading(), 700);
            this.errorMessage = error.error;
            this.successMessage = '';
            console.error('Erreur API :', error);
          }
      );
    }
  }


}