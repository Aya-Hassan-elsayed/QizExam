import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule,  MatFormFieldModule,
    MatInputModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup
  users: any[] = [];  
  constructor(private fb:FormBuilder,private service:AuthService ,private toaster:ToastrService,private router:Router){}

  ngOnInit(): void {
    this.CreateForm()
    this.getUser()
    
  }

  CreateForm(){
    this.userForm=this.fb.group({
      username:["",[Validators.required]],
      email:["",[Validators.required]],
     password:["",[Validators.required]]
    })
  }
  getUser(){
    this.service.getUsers().subscribe(res=>{
      const [user, admin] = res;
      this.users = [...user];  // Combine users and admins
    });


  }
  submit(){
    const model={
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    let index=this.users.findIndex(item=>item.email ==this.userForm.value.email)
    if(index!==-1){
      this.toaster.error("Email is already exit ")
    }else{

    this.service.CreateUser(model).subscribe(res=>{
      this.toaster.success("Success Register")
      this.router.navigate(['/Login'])
    })
  }
  }
}
