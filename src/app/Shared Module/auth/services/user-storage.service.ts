import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private readonly USER_KEY = 'user'; // or any key to store user data

  constructor() {}

  // Save user information in localStorage
  saveUser(user: { email: string; role: string }): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Get user information from localStorage
  getUser(): { email: string; role: string } | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Check if user is logged in (based on presence of user in localStorage)
  isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Check if admin is logged in (based on role)
  isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user ? user.role === 'admin' : false;
  }

  // Sign out by removing user data from localStorage
  signout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
