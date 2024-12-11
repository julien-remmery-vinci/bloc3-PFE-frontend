import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreUpdate } from '../types/score.types'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  updateScore(answerId: number, scoreUpdate: ScoreUpdate): Observable<any> {
    const payload = Object.fromEntries(
      Object.entries(scoreUpdate).filter(([_, value]) => value !== undefined)
    );
    console.log(payload);
    return this.http.patch(`${this.apiUrl}/answers/${answerId}/update-score`, payload);
  }
}