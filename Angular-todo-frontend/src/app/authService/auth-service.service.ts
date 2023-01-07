import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3500';
  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this.http.post('/auth/register', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post('/auth/loginUser', data);
  }
}
export interface userData {
  userName: string;
  email: string;
  password: string;
}
