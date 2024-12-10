import { Injectable } from '@angular/core';
import {Observable, } from "rxjs";
import {HttpClient } from "@angular/common/http";
import {AnswerPayload} from "../types/answer-payload";
import {AnswerPayloadCommentOnly} from "../types/answer-payloadCommentOnly";


@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'http://127.0.0.1:3000/answers';


  constructor(private http :HttpClient ) { }

  public sendAnswerById(answerPayload:AnswerPayload,answerId : number): Observable<any> {
    console.log(answerId)
    console.log(answerPayload)
    return this.http.post<any>(`http://127.0.0.1:3000/answers/${answerId}`,answerPayload);

  }
  sendAnswerCommentOnlyById(answerPayload:AnswerPayloadCommentOnly,answerId : number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${answerId}`,answerPayload);
  }
}
