import { inject, Injectable, Signal } from '@angular/core';
import { AuthedUser } from './user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private router = inject(Router);
  private aUser: Signal<AuthedUser> | null;

  constructor() {
     this.aUser = null;
  }

  getAuthedUser() {
    return this.aUser;
  }

  signup(signupData: any) {
    const isAuthedUser = this.authedUserHandler();
    if (isAuthedUser) {
      return;
    }
    console.log('Signup data:', signupData);
  }

  login(email: string, password: string) {
    const isAuthedUser = this.authedUserHandler();
    if (isAuthedUser) {
      return;
    }
    console.log('Login data:', { email, password });
  }

  logout() {
    console.log('Logout');
  }

  authedUserHandler(): boolean { 
    if (this.aUser) {
      alert('User already signed in. You can\'t sign up again.');
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }
}
