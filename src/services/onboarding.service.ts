import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private apiUrl = 'http://127.0.0.1:3000/onboarding';

  constructor(private http: HttpClient) {}

  submitOnboardingRequest(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
