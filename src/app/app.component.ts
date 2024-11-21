import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedModule } from './Shared Module/shared/shared.module';
import { UserStorageService } from './Shared Module/auth/services/user-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QizExam';
  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router, private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    this.updateLoginStatus();

    // Listen for router events to update login status dynamically
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus(): void {
    // Check login status for both admin and user
    const user = this.userStorageService.getUser();
    if (user) {
      this.isAdminLoggedIn = user.role === 'admin';
      this.isUserLoggedIn = user.role === 'user';
    } else {
      this.isAdminLoggedIn = false;
      this.isUserLoggedIn = false;
    }
  }

  logout(): void {
    this.userStorageService.signout();
    this.router.navigateByUrl('/Login');
  }
}
