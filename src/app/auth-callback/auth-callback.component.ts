import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <div class="spinner"></div>
        <h2>Completing your login...</h2>
        <p>Please wait while we finalize your authentication.</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0F0F0F;
      color: white;
      font-family: 'Poppins', sans-serif;
    }
    .callback-content {
      text-align: center;
      padding: 2rem;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #333;
      border-top: 4px solid #11CED4;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h2 {
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #D98E24, #11CED4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `]
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Handle OAuth callback with token and user info
    this.route.queryParams.subscribe(params => {
      const { token, flow, user, email } = params;
      
      if (token) {
        console.log('OAuth callback received:', { token, flow, user, email });
        
        // Save authentication data
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_name', user || email?.split('@')[0] || '');
        localStorage.setItem('user_email', email || '');
        localStorage.setItem('display_name', user || '');
        
        // Trigger storage event to update header
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'user_name',
          newValue: email || user || ''
        }));
        
        console.log('OAuth login successful:', { 
          email: email || user, 
          flow: flow,
          token: token ? 'received' : 'missing' 
        });
        
        // Show success message
        setTimeout(() => {
          alert(`${flow === 'signup' ? 'Registration' : 'Login'} successful! Welcome ${user || 'User'}!`);
          
          // Redirect based on flow
          if (flow === 'signup') {
            this.router.navigate(['/score-result']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 1000);
        
      } else {
        console.error('No token received in OAuth callback');
        alert('Login failed. Please try again.');
        this.router.navigate(['/home']);
      }
    });
  }
}