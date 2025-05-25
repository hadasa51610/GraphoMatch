import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay, tap } from "rxjs/operators"
import { NotificationService } from "../notification/notification.service"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) {
    // Check if user is already logged in from localStorage
    const user = localStorage.getItem("currentUser")
    if (user) {
      this.currentUserSubject.next(JSON.parse(user))
    }
  }

  login(email: string, password: string): Observable<any> {
    // Simulate API call with delay
    return of({
      id: 1,
      email: email,
      name: "Admin User",
      role: "admin",
    }).pipe(
      delay(1500),
      tap((user) => {
        // Store user details and token in local storage
        localStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(user)
        this.notificationService.showSuccess("Login successful", "Welcome to GraphoMatch Admin Dashboard")
      }),
    )
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
    this.router.navigate(["/login"])
    this.notificationService.showSuccess("Logged out", "You have been successfully logged out")
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value
  }
}
