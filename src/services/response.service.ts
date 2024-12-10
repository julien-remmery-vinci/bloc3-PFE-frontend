import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AnswerEsg} from "../types/AnswerEsg";
import {AnswerPayload} from "../types/answer-payload";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'http://127.0.0.1:3000/answer/';

  constructor(private http :HttpClient ) { }

  sendAnswerById(answerData:AnswerEsg): Observable<any> {
    let answerPayload : AnswerPayload
    //answerPayload.form_id =
    return this.http.post<any>(`${this.apiUrl}/${answerData.answer_id}`,answerData);
  }
}
