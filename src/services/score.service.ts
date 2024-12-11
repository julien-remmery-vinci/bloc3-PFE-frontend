import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  updateScore(answerId: number, score: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/answers/${answerId}/update-score`, { score });
  }
}