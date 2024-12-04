import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    const loginData = { login, password };
    return this.http.post<any>(`${this.apiUrl}`, loginData)
        .pipe(map(response => {
          if (response && response.token) {
            this.setToken(response.token);
          }
          return response;
        }));
  }
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private clearToken(): void {
    localStorage.removeItem('authToken');
  }
  logout(): void {
    this.clearToken();
  }
  isTokenValid(): boolean {
    const token = this.getToken();
    if(token){
      const expirationDate = this.getTokenExpirationDate(token);
      return expirationDate ? expirationDate  > new Date() : false;
    }
    return false;
  }
  private getTokenExpirationDate(token: string): Date | null {
    const decoded: any = this.decodeToken(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  private decodeToken(token: string): any {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
}
