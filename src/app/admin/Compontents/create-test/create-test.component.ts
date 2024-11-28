import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../Shared Module/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminServiceService } from '../../service/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']  // Fixed the styleUrl typo to styleUrls
})
export class CreateTestComponent implements OnInit {
  taskform!: FormGroup;
  testId!: string; // سيتم تخزين الـ testId هنا

  
  constructor(
    private services: AdminServiceService,
    private fb: FormBuilder,
    private route: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      timePerQuestion: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.taskform.valid) {
      const model = {
        
        title: this.taskform.value.title,
        timePerQuestion: this.taskform.value.timePerQuestion,
        description: this.taskform.value.description,
      };

      this.services.createtest(model).subscribe(
        (res) => {
          this.testId=res.id
          this.toaster.success('Test created successfully!');
          this.route.navigate(['/admin/dashboard']);
        },
        (error) => {
          this.toaster.error('Failed to create test');
          console.error(error);
        }
      );
    }
  }
}
