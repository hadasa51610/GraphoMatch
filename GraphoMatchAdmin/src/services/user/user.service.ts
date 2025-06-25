import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-12-20'),
      analysisCount: 15
    },
    {
      id: '2',
      email: 'jane.smith@email.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      lastLogin: new Date('2024-12-19'),
      analysisCount: 8
    },
    {
      id: '3',
      email: 'mike.johnson@email.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'user',
      status: 'inactive',
      createdAt: new Date('2024-03-10'),
      lastLogin: new Date('2024-11-15'),
      analysisCount: 3
    }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.mockUsers);
  public users$ = this.usersSubject.asObservable();

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: string): Observable<User | undefined> {
    return of(this.mockUsers.find(user => user.id === id));
  }

  updateUser(updatedUser: User): Observable<User> {
    const index = this.mockUsers.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.mockUsers[index] = updatedUser;
      this.usersSubject.next([...this.mockUsers]);
    }
    return of(updatedUser);
  }

  deleteUser(id: string): Observable<boolean> {
    const index = this.mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      this.mockUsers.splice(index, 1);
      this.usersSubject.next([...this.mockUsers]);
      return of(true);
    }
    return of(false);
  }

  getUserStats(): Observable<any> {
    const totalUsers = this.mockUsers.length;
    const activeUsers = this.mockUsers.filter(user => user.status === 'active').length;
    const totalAnalyses = this.mockUsers.reduce((sum, user) => sum + user.analysisCount, 0);
    
    return of({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalAnalyses,
      averageAnalysesPerUser: Math.round(totalAnalyses / totalUsers)
    });
  }
}