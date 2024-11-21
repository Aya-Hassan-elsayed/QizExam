import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


}
