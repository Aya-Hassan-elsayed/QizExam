import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  baseUrl="http://10.100.102.30:3001/"

  constructor( private _HttpClient:HttpClient) { }
  createtest(model:any) :Observable<any>
  {
   return this._HttpClient.post(`${this.baseUrl}tests`,model)


  }
  viewTest():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}tests`)
  }
  // getQuestions(testId: string): Observable<any> {
  //   return this._HttpClient.get(`${this.baseUrl}tests/${testId}/questions`);
  // }
  
  addQuestions(model: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}specficQuestion`,model );
  }
  getspecificQuestion():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}specficQuestion`)
  }
  deletspecificQuestion(questionId: string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}specficQuestion/${questionId}`);

  }
  
}
  
  

