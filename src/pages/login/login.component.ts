import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(protected authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
          (response) => {
            //this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error('Login failed', error);
            this.errorMessage = error;
          }
      );
    } else {
      this.errorMessage = 'Please fill in both fields.';
    }
  }
}
