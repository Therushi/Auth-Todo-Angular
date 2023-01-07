import { Injectable } from '@angular/core';
import { Todo } from '../todoModels/todo';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private apiUrl = 'http://localhost:3500';
  constructor(private http: HttpClient) {}

  getTodo(data: any): Observable<any> {
    return this.http.post('/getAllTodo', data);
  }
  editTodo(data: any): Observable<any> {
    return this.http.post('/editTodo', data);
  }
  deleteTodo(data: any): Observable<any> {
    return this.http.post('/deleteTodo', data);
  }
  createTodo(data: any): Observable<any> {
    return this.http.post('/createTodo', data);
  }
}
