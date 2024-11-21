import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BaseUrl = 'http://10.100.102.30:3001/';

  constructor(private http: HttpClient) { }

  CreateUser(model: any): Observable<any> {
    return this.http.post(`${this.BaseUrl}user`, model);
  }
  getUsers(): Observable<any> {
    const usersRequest = this.http.get(`${this.BaseUrl}user`);
    const adminsRequest = this.http.get(`${this.BaseUrl}admin`);
    
    // Using forkJoin to combine both requests
    return forkJoin([usersRequest, adminsRequest]);
  }
  login(model: any): Observable<any> {
    return this.http.post(`${this.BaseUrl}login`, model);
  }
}
