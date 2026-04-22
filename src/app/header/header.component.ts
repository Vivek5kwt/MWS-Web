import { Component, OnInit, OnDestroy } from '@angular/core';
// ...existing imports...
import { SignUpPopupComponent } from '../sign-up-popup/sign-up-popup.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  public userName: string = '';
  public userEmail: string = '';
  public showProfileMenu: boolean = false;
  public url: string = '';
  private routeSubscription: Subscription | undefined;
  public isMenuOpen: boolean = false;
  public showSignUpPopup: boolean = false;

  constructor(private router: Router) {
    // Access the path from route
  }

  onGoogleAuth() {
    // Redirect to Google OAuth with login state
    window.location.href = 'http://localhost:3000/oauth2/authorization/google?state=login';
  }

  openSignUpPopup() {
    this.showSignUpPopup = true;
  }

  closeSignUpPopup() {
    this.showSignUpPopup = false;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.urlAfterRedirects;
      });
    // Check login status on load
    this.syncLoginState();
    window.addEventListener('storage', this.syncLoginState.bind(this));
    window.addEventListener('focus', this.syncLoginState.bind(this));
    
    // Also check every 2 seconds for login state changes
    setInterval(() => {
      this.syncLoginState();
    }, 2000);
  }

  syncLoginState() {
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');
    this.isLoggedIn = !!token;
    this.userName = name || '';
    this.userEmail = email || '';
    console.log('Header - Login state synced:', { 
      isLoggedIn: this.isLoggedIn, 
      userName: this.userName,
      userEmail: this.userEmail,
      token: token ? 'exists' : 'missing',
      initial: this.getInitial()
    });
  }

  getInitial(): string {
    if (!this.userName) {
      return '?';
    }
    
    // Get first letter of the first name
    return this.userName.charAt(0).toUpperCase();
  }

  onProfileClick() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';
    this.showProfileMenu = false;
    window.location.reload();
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(section: string) {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
