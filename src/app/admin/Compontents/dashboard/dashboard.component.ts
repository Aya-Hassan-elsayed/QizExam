import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdminServiceService } from '../../service/admin-service.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,NgFor,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit
{

Taks:{title:string,timePerQuestion:number,description:string, id:string}[]=[]
testId!:string
constructor(private  services:AdminServiceService){}

  ngOnInit(): void {
    this.Viewtask()
    
  }
  Viewtask(){
    this.services.viewTest().subscribe(res=>{
      const test = res.find((test: any) => test.id === this.testId);  // أو حسب الـ testId الموجود في الرابط
      this.Taks =res
      console.log(res)
    })
  }
}
