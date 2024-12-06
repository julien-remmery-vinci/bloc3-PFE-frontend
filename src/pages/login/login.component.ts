import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(protected authService: AuthService, private router: Router,private loadingService:LoadingService) {}

  onSubmit() {
    if (this.username && this.password) {
      this.loadingService.showLoading()
      this.authService.login(this.username, this.password).subscribe(
          (response) => {
            setTimeout(() => this.loadingService.hideLoading(), 1100); // Hide spinner after 2 seconds
            this.loadingService.hideLoading();
            this.router.navigate(['/forms']);
          },
          (error) => {
            this.loading = false;
            console.error('Login failed', error);
            this.errorMessage = error;
          }
      );
    } else {
      this.loading = false;
      this.errorMessage = 'Please fill in both fields.';
    }
  }
}
