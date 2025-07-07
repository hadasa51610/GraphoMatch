import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private mockUsers: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.mockUsers);
  public users$ = this.usersSubject.asObservable();
  private baseURL = 'https://localhost:7134/api';

  constructor(private http: HttpClient) {
    this.getUsers().subscribe();
   }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/User`).pipe(
      tap((users) => {
        this.mockUsers = users;
        this.usersSubject.next(users);
      })
    );
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.baseURL}/User/${id}`).pipe(
      tap(user => {
        if (user) {
          this.usersSubject.next([user]);
        }
      })
    );
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/User/${updatedUser.id}`, updatedUser).pipe(
      tap(user => {
        const currentUsers = this.usersSubject.getValue();
        const index = currentUsers.findIndex(u => u.id === user.id);
        if (index !== -1) {
          currentUsers[index] = user;
          this.usersSubject.next(currentUsers);
        }
      })
    );
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/User/${id}`);
  }

  getTotalAnalyses(): Observable<number> {
    return this.http.get<any[]>(`${this.baseURL}/HandWriting`).pipe(
      map(analyses => analyses.filter(a => a.AnalysisResult != 'none').length),
    );
  }

  getUserStats(): Observable<any> {
    const totalUsers = this.mockUsers.length;
    return this.getTotalAnalyses().pipe(
      map(totalAnalyses => ({
        totalUsers,
        totalAnalyses,
        averageAnalysesPerUser: totalUsers > 0 ? Math.round(totalAnalyses / totalUsers) : 0
      }))
    );
  }
}