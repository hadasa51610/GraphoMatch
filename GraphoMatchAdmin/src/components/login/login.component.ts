import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const loginObservable = await this.authService.login(this.credentials.email, this.credentials.password);
      loginObservable.subscribe({
        next: (success) => {
          if (success) {
            if(this.authService.getUserRole(success.token)=='Admin'){
            this.router.navigate(['/dashboard']);
            }
            else {
              this.errorMessage= 'You do not have permission to access this application. Please contact your administrator.';
              this.isLoading = false;
            }
          } else {
            this.errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          }
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Login failed. Please check your connection and try again.';
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your connection and try again.';
      this.isLoading = false;
    }
    this.credentials = {
      email: '',
      password: ''
    }
  }
}