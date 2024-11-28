import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: { email: string; password: string; role: string }[] = []; 
  
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private UserStorage:UserStorageService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  getUsers(): void {
    this.authService.getUsers().subscribe((res) => {
      const [user, admin] = res;
      this.users = [...user,...admin];  // Combine users and admins
    });
  } 

  submit(): void {

    const model ={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password

    }
    const user = this.users.find(
      (item) => item.email === this.loginForm.value.email&& item.password === this.loginForm.value.password
    );
  
    if (!user) {
      this.toastr.error('Invalid email or password');
      return;
    }
    
    this.toastr.success('Login successful!');
    const userData = {
     email: user.email,     
     role: user.role
    };
    this.UserStorage.saveUser(userData);
    
    if (user.role === 'admin') {
      this.toastr.success('Welcome, Admin!');
      this.router.navigate(['/admin/dashboard']);
    } else if (user.role === 'user') {
      this.toastr.success('Welcome, User!');
      this.router.navigate(['/user/dashboard']);
    } 
    }
   
    
  }
  


