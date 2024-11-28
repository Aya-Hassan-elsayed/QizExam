import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../service/admin-service.service';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

export interface SpecficQuestions {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
  id:string
}

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [NgFor, MatCardModule],
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css'], // Fixed typo
})
export class ViewTestComponent implements OnInit {
  specficQuestions: any[] = []; // Holds the questions for the current test
  testid!: string; // Test ID from route parameters

  constructor(
    private services: AdminServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve test ID from route parameters
    this.testid = this.route.snapshot.paramMap.get('id') || '';
    console.log('Test ID:', this.testid);

    // Fetch questions for the test
    this.getQuestion();
  }

  getQuestion() {
    this.services.getspecificQuestion().subscribe((res) => {
      console.log('Response:', res);
  
      const relatedTests = res.filter((test: any) => test.id === this.testid);
      console.log('Related Tests:', relatedTests);
  
      this.specficQuestions = relatedTests.flatMap((test: any) =>
        Array.isArray(test.questions) ? test.questions : []
      );
      console.log('Flattened Questions Array:', this.specficQuestions);
    });
  }
  deleteQuestion(test: string){

    this.services.deletspecificQuestion(this.testid).subscribe(res=>{
      this.specficQuestions=this.specficQuestions.filter(
        (question) => question.id !== this.testid
        

      
      )
      

    })

  }
  
}
