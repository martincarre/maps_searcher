import { inject, Injectable, signal} from '@angular/core';
import { AuthedUser } from './user.interface';
import { Router } from '@angular/router';
import { mockAuthUsers } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private router = inject(Router);
  private aUser = signal<AuthedUser | null>(null);

  // NOTE: Might have to set this user here in the constructor. Not sure.
  constructor() {
    
  }

  getAuthedUser() {
    
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
    const foundUser = mockAuthUsers.find(user => user.email === email);
    if (!foundUser) {
      alert('User not found. Please sign up.');
      this.router.navigate(['/user/signup']);
      return;
    } else {
      this.aUser.set(foundUser);
    }
  }

  logout() {
    console.log('Logout');
  }

  authedUserHandler(): boolean { 
    if (this.aUser()) {
      alert('User already signed in. You can\'t sign up again.');
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }
}
