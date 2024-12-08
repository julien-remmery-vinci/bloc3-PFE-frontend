import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { User } from 'src/types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
    this.user = this.userSubject.asObservable();
  }

  login(login: string, password: string): Observable<any> {
    const loginData = { login, password };
    return this.http.post<any>(`${this.apiUrl}`, loginData)
        .pipe(map(response => {
          console.log(response);
          if (response && response.token) {
            this.setToken(response.token);
            this.setUser(response.user);

          }
          return response;
        }));
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  private setUser(user: any): void {
    localStorage.setItem('authUser', JSON.stringify(user));
    this.userSubject.next(user);
  }
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private clearToken(): void {
    localStorage.removeItem('authToken');
  }
  private clearUser(): void {
    localStorage.removeItem('authUser');
    this.userSubject.next(null);
  }

  logout(): void {
    this.clearToken();
    this.clearUser();

  }

  registerUser(user: User): Observable<{ message: string }> {
    const apiUrl = 'http://127.0.0.1:3000/register';
    return this.http.post<{ message: string }>(apiUrl, user);
  }  

  isTokenValid(): boolean {
    const token = this.getToken();
    if(token){
      const expirationDate = this.getTokenExpirationDate(token);
      return expirationDate ? expirationDate  > new Date() : false;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return user && user.role === 'admin';
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
  public getUserFromStorage(): any {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }
}
