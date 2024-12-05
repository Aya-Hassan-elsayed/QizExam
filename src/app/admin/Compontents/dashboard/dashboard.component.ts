import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdminServiceService } from '../../service/admin-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { UserStorageService } from '../../../Shared Module/auth/services/user-storage.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,NgFor,RouterModule,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit
{

Taks:{title:string,timePerQuestion:number,description:string, id:string}[]=[]
testId!:string;
isUserLoggedIn: boolean = false;
isAdminLoggedIn: boolean = false;
constructor(private  services:AdminServiceService,private userStorageService:UserStorageService,private router:Router){}

  ngOnInit(): void {
    this.updateLoginStatus();

    // Listen for router events to update login status dynamically
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
    this.Viewtask()
    
  }
  Viewtask(){
    this.services.viewTest().subscribe(res=>{
      const test = res.find((test: any) => test.id === this.testId);  // أو حسب الـ testId الموجود في الرابط
      this.Taks =res
      console.log(res)
    })
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
}
