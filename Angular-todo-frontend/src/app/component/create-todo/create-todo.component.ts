import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoServiceService } from 'src/app/todoService/todo-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { SnakbarService } from 'src/app/todoService/snakbar.service';
import { DataSharingService } from 'src/app/todoService/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  taskCtrl = new FormControl();
  tasks: string[] = [];
  title = new FormControl('');
  public sharedTodoData!: Todo;
  public subscription: Subscription | undefined;

  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private getTodoService: TodoServiceService,
    private snakBar: SnakbarService,
    private shareService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shareService
      .getTodoData()
      .subscribe((todoData) => {
        this.sharedTodoData = todoData;
        console.log(this.shareService, 'Shared Service');
        if (this.sharedTodoData) {
          let title: any = this.sharedTodoData.title;
          let tasks = this.sharedTodoData.task;
          this.title.setValue(title);
          this.taskCtrl.setValue(tasks);
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  onCreateTodo() {
    const userId = localStorage.getItem('userId');
    const data = {
      title: this.title.value,
      task: this.tasks,
      userId: userId,
    };
    if (data && this.title.valid && this.tasks.length > 0) {
      this.getTodoService.createTodo(data).subscribe((res) => {
        if (res.status) {
          window.location.reload();
          this.snakBar.info(res.message);
        }
      });
    } else {
      this.snakBar.info('Please Fill all details');
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tasks.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.taskCtrl.setValue(null);
  }

  remove(task: string): void {
    const index = this.tasks.indexOf(task);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }
}
export interface Todo {
  title?: String;
  task: string[];
}
