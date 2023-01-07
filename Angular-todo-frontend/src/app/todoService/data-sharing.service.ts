import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Todo } from '../todoModels/todo';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private todoData = new Subject<any>()
  constructor() { }

  public getTodoData(): Observable<any>{
    return this.todoData.asObservable();
  }

  public updateTodo(data : Todo){
    this.todoData.next(data);
  }
}
