import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private baseURL = 'https://localhost:7134/api/Auth';

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  async login(email: string, password: string): Promise<Observable<{ token: string; user: { email: string; password: string; }; }>> {
    if (!email || !password) {
      return new Observable(observer => {
        observer.error('Email and password are required');
        observer.complete();
      });
    }
    const credentials = { email, password };
    const res = await this.http.post<{ token: string; user: { email: string; password: string; }; }>(`${this.baseURL}/login`, {
      Email: credentials.email,
      Password: credentials.password
    });
    return new Observable(observer => {
      res.subscribe({
        next: (data) => {
          sessionStorage.setItem('authToken', data.token);
          observer.next(data);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        }
      });
    });
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }

  getUserRole(token: string): string | null {
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(role);

      if (Array.isArray(role)) {
        return role[0];
      }

      if (typeof role === "string") {
        return role;
      }
      return null;
    } catch (e) {
      console.log('Error decoding token:', e);
      return null;
    }
  }


  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}