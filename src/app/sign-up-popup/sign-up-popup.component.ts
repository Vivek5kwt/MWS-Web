import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginPopupComponent],
  templateUrl: './sign-up-popup.component.html',
  styleUrls: ['./sign-up-popup.component.scss']
})
export class SignUpPopupComponent {
  showLoginPopup() {
    // TODO: Implement login popup trigger
    alert('Show login popup (to be implemented)');
  }
    showLoginPopupModal = false;
  @Output() close = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Input() mode: 'header' | 'journey' = 'journey';

  step = 1;
  email = '';
  name = '';
  phone = '';
  countryCode = '+91';
  loading = false;
  error: string | null = null;


  constructor(private http: HttpClient) {}

  onGoogleAuth() {
    // Redirect to Google OAuth with signup state
    window.location.href = 'http://localhost:3000/oauth2/authorization/google?state=signup';
  }

  onClose() {
    this.close.emit();
  }

  onSkip() {
    this.skip.emit();
  }

  onContinueEmail() {
    // Here you would typically validate email and/or send to backend
    this.step = 3;
  }

  password = '';

  onUnlockScore() {
    this.loading = true;
    this.error = null;
    const payload = {
      email: this.email,
      phone: this.phone,
      name: this.name,
      password: this.password
    };
    this.http.post<any>('http://localhost:3000/auth/register', payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          
          // Save user email from registration form as fallback
          let userEmail = this.email;
          
          // Try to decode JWT to get email if available
          try {
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            if (payload.email) {
              userEmail = payload.email;
            } else if (payload.sub) {
              userEmail = payload.sub;
            }
          } catch (e) {
            console.log('Could not decode JWT, using form email');
          }
          
          // Save user info (use the name from the form, not email)
          localStorage.setItem('user_name', this.name || userEmail.split('@')[0]);
          localStorage.setItem('user_email', userEmail);
          
          alert('Registration successful!');
          window.location.href = '/score-result';
        } else {
          this.error = res.message || 'Registration failed.';
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.loading = false;
        if (err.status === 0 || err.message?.includes('ERR_CONNECTION_REFUSED')) {
          this.error = 'Server is not available. Please try again later.';
        } else if (err.status === 404) {
          this.error = 'Registration endpoint not found. Please contact support.';
        } else if (err.status === 409) {
          this.error = 'User already exists with this email or phone.';
        } else if (err.status >= 500) {
          this.error = 'Server error. Please try again later.';
        } else {
          this.error = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
