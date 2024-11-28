import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../../../Shared Module/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../service/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-questing',
  standalone: true,
  imports: [SharedModule, MatRadioModule, MatInputModule],  // قم بإزالة MatFormField و MatLabel هنا لأن SharedModule يحتوي عليهما
  templateUrl: './add-questing.component.html',
  styleUrls: ['./add-questing.component.css'],
})
export class AddQuestingComponent implements OnInit {
  QuestionForm!: FormGroup;
  questions: any[] = [];
  correctNum!: string; // Store the key of the correct answer (e.g., 'answer1')
  id!: string; // Store testId here

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private service: AdminServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    // جلب testId من الرابط
    this.id = this.route.snapshot.paramMap.get('id') || ''; 

    this.createForm();
  }

  createForm() {
    this.QuestionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
    });
  }

  createQuestion() {
    // تأكد من أن النموذج يحتوي على إجابة صحيحة
    if (this.QuestionForm.valid && this.correctNum) {
      const model = {
        question: this.QuestionForm.value.question,
        answer1: this.QuestionForm.value.answer1,
        answer2: this.QuestionForm.value.answer2,
        answer3: this.QuestionForm.value.answer3,
        answer4: this.QuestionForm.value.answer4,
        correctAnswer: this.QuestionForm.value[this.correctNum], // استخدم الإجابة الصحيحة ديناميكياً
      };

      // إضافة السؤال إلى قائمة الأسئلة إذا كانت جميع الحقول مكتملة
      if (model.question && model.answer1 && model.answer2 && model.answer3 && model.answer4) {
        this.questions.push(model);
        this.toast.success('Question added successfully!');
      } else {
        this.toast.error('Please fill out all fields');
      }
    } else {
      this.toast.error('Please choose the correct answer');
    }
    console.log(this.questions);
  }

  // تخزين الإجابة الصحيحة
  getcorrect(event: any) {
    this.correctNum = event.value; // Store the selected answer key
  }

  // إرسال الأسئلة إلى الـ backend
  submit() {
    const model = {
      id: this.id,  // تمرير testId مع الأسئلة
      questions: this.questions,  // الأسئلة التي تمت إضافتها
    };

    this.service.addQuestions(model).subscribe(
      (res) => {
        this.toast.success('Questions added successfully!');
        console.log('Response:', res);
        this.router.navigate(['/admin/view-task/',this.id])
      },
      (error) => {
        this.toast.error('Failed to add questions!');
        console.error('Error:', error);
      }
    );
  }
}
