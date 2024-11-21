import { Component, input, OnInit } from '@angular/core';
import { SharedModule } from '../../../Shared Module/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminServiceService } from '../../service/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule,
    MatInputModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent  implements OnInit{
  
  taskform!:FormGroup
  tests: { title: string; timePerQuestion: number; description: string }[] = [];
  constructor( private services:AdminServiceService ,private fb:FormBuilder){}
  
 

  ngOnInit(): void {
    this.createForm()
    
  }
  createForm(): void {
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      timePerQuestion: ['', Validators.required],
      description: ['', Validators.required],


    });
  }
  sumbit(){
    const model={
      title:this.taskform.value.title,
      timePerQuestion:this.taskform.value.timePerQuestion,
      description:this.taskform.value.description


    }
    if(this.taskform.valid){
      this.services.createtest(model).subscribe(res=>{
        console.log(res)

    
   


    })
  }

    }
  }



