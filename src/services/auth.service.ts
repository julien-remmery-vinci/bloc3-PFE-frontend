import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "src/types/User";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login';
  private apiFetchUserUrl = 'http://127.0.0.1:3000/auth/verify'
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
      this.userSubject = new BehaviorSubject<User|null>(null);
    this.user = this.userSubject.asObservable();
  }

  login(login: string, password: string): Observable<any> {
    const loginData = { login, password };
    return this.http.post<any>(`${this.apiUrl}`, loginData)
        .pipe(map(response => {
          if (response && response.token) {
            this.setToken(response.token);
            this.setUser(response.user);
          }
          return response;
        }));
  }

  loadUserFromServerIfTokenValid(): void {
    if (this.isTokenValid()) {
      this.fetchUserFromServer().subscribe(
          user => {
            this.setUser(user);  // Update BehaviorSubject
          })
    }
  }
  private fetchUserFromServer(): Observable<User> {
    return this.http.get<User>(`${this.apiFetchUserUrl}`);
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  setUser(user: any): void {
    this.userSubject.next(user);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getCurrentUser(): any {
    return this.userSubject.getValue();
  }
  private clearToken(): void {
    localStorage.removeItem('authToken');
  }
  private clearUser(): void {
    this.userSubject.next(null);
  }

  logout(): void {
    this.clearToken();
    this.clearUser();
    this.router.navigate(["/login"]);
  }

  registerUser(user: User): Observable<{ message: string }> {
    const apiUrl = "http://127.0.0.1:3000/auth/register";
    return this.http.post<{ message: string }>(apiUrl, user);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (token) {
      const expirationDate = this.getTokenExpirationDate(token);
      return expirationDate ? expirationDate > new Date() : false;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return user && user.role === "admin";
  }
  isUser(): boolean {
    const user = this.userSubject.getValue();
    return user && user.role === "user";
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

  public getUser(): Observable<User> {
    return this.user;
  }

  public getCurrentUserValue(): User {
    return this.userSubject.value;
  }
}
