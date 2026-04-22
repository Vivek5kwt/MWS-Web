import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() showSignUp = new EventEmitter<void>();

  email = '';
  password = '';
  error: string | null = null;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  onLogin() {
    this.error = null;
    const body = {
      emailOrPhone: this.email,
      password: this.password
    };
    this.http.post<{ token?: string; message?: string; user?: any }>('http://localhost:3000/auth/login', body).subscribe({
      next: (res: { token?: string; message?: string; user?: any }) => {
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          
          // Save user email from login form as fallback
          let userEmail = this.email;
          
          // Try to decode JWT to get email and name if available
          let userName = userEmail.split('@')[0]; // Default to first part of email
          try {
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            console.log('JWT payload:', payload);
            if (payload.email) {
              userEmail = payload.email;
            } else if (payload.sub) {
              userEmail = payload.sub; // Email is in 'sub' field
            }
            // Try to get name from JWT payload
            if (payload.name) {
              userName = payload.name;
            } else if (payload.given_name) {
              userName = payload.given_name;
            }
          } catch (e) {
            console.log('Could not decode JWT, using form email', e);
          }
          
          // Check if user object has name information
          if (res.user && res.user.name) {
            userName = res.user.name;
          }
          
          // Save user info
          localStorage.setItem('user_name', userName);
          localStorage.setItem('user_email', userEmail);
          
          console.log('Saved user info:', { userEmail, token: res.token });
          
          alert('Login successful!');
          this.close.emit();
          
          // Force reload to update header state
          window.location.reload();
        } else {
          this.error = res.message || 'Login failed.';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        if (err.status === 0 || err.message?.includes('ERR_CONNECTION_REFUSED')) {
          this.error = 'Server is not available. Please try again later.';
        } else if (err.status === 404) {
          this.error = 'Please try again. Please contact support.';
        } else if (err.status === 401) {
          this.error = 'Invalid email or password. Please try again.';
        } else if (err.status >= 500) {
          this.error = 'Server error. Please try again later.';
        } else {
          this.error = err.error?.message || 'Login failed. Please try again.';
        }
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onShowSignUp() {
    this.showSignUp.emit();
  }
}
