import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SubmitValidation} from "../types/SubmitValidation";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getUserForms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms/user`);
  }
  
  submitForm(form_id:number,confirmation:SubmitValidation) : Observable<any> {
    return this.http.post(`${this.apiUrl}/forms/${form_id}/submit`,confirmation);
  }

  validateForm(form_id: number | undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/forms/${form_id}/validate`, {});
  }

  getAnswers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms`);
  }
}