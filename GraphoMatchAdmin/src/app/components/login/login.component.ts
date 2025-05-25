import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { NotificationService } from "../../../services/notification/notification.service"
import { AuthService } from "../../../services/auth/auth.service"
import { MatIcon } from "@angular/material/icon"
import { MatCard,MatCardHeader,MatCardContent,MatCardSubtitle,MatCardTitle,MatCardFooter } from "@angular/material/card"
import { MatSpinner } from "@angular/material/progress-spinner"
import { MatError } from "@angular/material/select"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from "@angular/material/select"
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input"

@Component({
  selector: "app-login",
  imports: [MatIcon,MatCard,MatCardHeader,MatCardContent,MatCardSubtitle,MatCardTitle,
    MatCardFooter,MatSpinner,MatError,MatFormFieldModule,MatLabel,CommonModule,ReactiveFormsModule,MatInputModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoading = false
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.loginForm = this.fb.group({
      email: ["admin@graphomatch.com", [Validators.required, Validators.email]],
      password: ["password", [Validators.required]],
    })
  }

  ngOnInit(): void {
    // If already logged in, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"])
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(["/dashboard"])
      },
      error: (error:any) => {
        console.log(error);
        this.isLoading = false
        this.notificationService.showError("Login failed", "Invalid email or password")
      },
    })
  }
}
