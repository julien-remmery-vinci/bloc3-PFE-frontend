import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Onboarding } from 'src/types/onboarding';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private apiUrl = 'http://127.0.0.1:3000/onboarding';

  constructor(private http: HttpClient) {}

  submitOnboardingRequest(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getPendingOnboardingForms(): Observable<Onboarding[]> {
    return this.http.get<any>(this.apiUrl+`/pending`);
  }
  getRejectedOnboardingForms(): Observable<Onboarding[]> {
    return this.http.get<any>(this.apiUrl+`/rejected`);
  }
  validateOnboardingRequest(onboarding_id: number): Observable<any> {
      return this.http.post<any>(this.apiUrl+`/${onboarding_id}/accept`,null);
  }
  refuseOnboardingRequest(onboarding_id: number): Observable<any> {
      return this.http.post<any>(this.apiUrl+`/${onboarding_id}/reject`,null);
  }
}
