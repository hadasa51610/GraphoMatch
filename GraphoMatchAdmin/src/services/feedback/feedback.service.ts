import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Feedback } from '../../models/feedback.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseURL = 'https://localhost:7134/api';

  private feedbackSubject = new BehaviorSubject<Feedback[]>([]);
  public feedback$ = this.feedbackSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getFeedback().subscribe(feedback => {
      this.feedbackSubject.next(feedback);
    });
   }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseURL}/Feedback`).pipe(
      tap((feedback) => {
        this.feedbackSubject.next(feedback);
      })
    );
  }
}