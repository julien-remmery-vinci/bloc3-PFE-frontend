import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/login';

  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.apiService.post<any>(this.apiUrl, loginData);
  }
}
