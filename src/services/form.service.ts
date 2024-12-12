import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getUserForms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms/user`);
  }
  getForms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms`);
  }
}