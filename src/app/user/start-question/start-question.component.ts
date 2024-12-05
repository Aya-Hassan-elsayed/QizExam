import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../admin/service/admin-service.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

export interface SpecficQuestion {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}

@Component({
  selector: 'app-start-question',
  standalone: true,
  imports: [MatCardModule, NgIf,NgFor],
  templateUrl: './start-question.component.html',
  styleUrls: ['./start-question.component.css']
})
export class StartQuestionComponent implements OnInit, OnDestroy {
  specficQuestions: SpecficQuestion[] = [];
  testid!: string;
  currentQuestionIndex: number = 0;
  remainingTime!: number;
  timerSubscription!: Subscription;
  examEnded: boolean = false;
  timePerQuestion!: number;
  timerId: any;
  correctNum!:string;
  correctanswer!:string

  constructor(private route: ActivatedRoute, private services: AdminServiceService) {}

  ngOnInit(): void {
    this.testid = this.route.snapshot.paramMap.get('id') || '';
   this.getQuestions()
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  getTimeQiz() {
    this.services.viewTest().subscribe((res) => {
      const relatedTest = res.find((test: any) => test.id === this.testid);
      if (relatedTest) {
        this.timePerQuestion = relatedTest.timePerQuestion;
        console.log('Time Per Question:', this.timePerQuestion);
        this.getQuestions();
      } else {
        console.log('No test found for the given ID.');
      }
    });
  }

  getQuestions() {
    this.services.getspecificQuestion().subscribe((res) => {
      console.log('Response:', res);

      const relatedTests = res.filter((test: any) => test.id === this.testid);
      console.log('Related Tests:', relatedTests);
  
      this.specficQuestions = relatedTests.flatMap((test: any) =>
        Array.isArray(test.questions) ? test.questions : []
      
      );

      console.log('Flattened Questions Array:', this.specficQuestions);
    });
    //   if (this.specficQuestions.length > 0) {
    //     this.startQuestionTimer();
    //   }
    
  }
  getcorrect(event: any): void {
    this.correctNum = event.target.value;
    console.log('Selected Answer:', this.correctNum);
  }
  
  submit(): void {
    const currentQuestion = this.specficQuestions[this.currentQuestionIndex];
    
  
    if (this.correctNum === currentQuestion.correctAnswer) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer. The correct answer is: " + currentQuestion.correctAnswer);
    }
  
    // الانتقال للسؤال التالي
    this.currentQuestionIndex++;
    this.correctNum = ''; // إعادة تعيين الإجابة المختارة
  
    if (this.currentQuestionIndex >= this.specficQuestions.length) {
      this.examEnded = true; // إنهاء الامتحان
      alert("Exam completed!");
    }
  }
  


  // startQuestionTimer() {
  //   if (this.currentQuestionIndex < this.specficQuestions.length) {
  //     this.remainingTime = this.timePerQuestion;
  //     console.log(`Starting question ${this.currentQuestionIndex + 1}, Time: ${this.remainingTime} seconds`);

  //     this.timerId = setTimeout(() => {
  //       this.currentQuestionIndex++;
  //       if (this.currentQuestionIndex < this.specficQuestions.length) {
  //         this.startQuestionTimer();
  //       } else {
  //         this.examEnded = true;
  //         console.log('Exam ended!');
  //       }
  //     }, this.timePerQuestion * 100);
  //   }
  // }
}
