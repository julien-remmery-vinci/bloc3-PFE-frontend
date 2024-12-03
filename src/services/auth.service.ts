import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login';

  constructor(private apiService: ApiService) {}

  login(login: string, password: string): Observable<any> {
    const loginData = { login, password };
    return this.apiService.post<any>(this.apiUrl, loginData);
  }
}
