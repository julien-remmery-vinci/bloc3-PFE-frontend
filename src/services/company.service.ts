// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/types/Company';
import { Form } from 'src/types/Form';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://127.0.0.1:3000/company'; // Replace with your API endpoint
  private formsApiUrl = 'http://127.0.0.1:3000/forms/company'

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getFormStatus(companyId: number): Observable<number> {
    return this.http.get<number>(this.apiUrl+`/${companyId}/forms/status`);
  }

  getForms(companyId: number): Observable<{key : Company,forms : Form[]}> {
    return this.http.get<{key : Company,forms : Form[]}>(this.apiUrl+`/${companyId}`);
  }
}
