import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/todoModels/todo';
import { TodoServiceService } from 'src/app/todoService/todo-service.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DataSharingService } from 'src/app/todoService/data-sharing.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  todos!: Todo[];
  modalData: String[] = [];
  editedTitle: String = '';
  isLoading: boolean = false;
  userId: any;
  constructor(
    private getTodoService: TodoServiceService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private shareService: DataSharingService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.getTodos();
    }
  }
  getTodos() {
    this.isLoading = true;
    this.getTodoService.getTodo(this.userId).subscribe((res) => {
      if (res.status) {
        this.todos = res.data;
        console.log(res.data);
        this.isLoading = false;
      }
    });
  }

  deleteTodo(id: number, todo: any) {
    let todoId = todo._id;
    let data = {
      id: todoId,
    };
    console.log(todoId);
    this.isLoading = true;
    if (todoId) {
      this.getTodoService.deleteTodo(data).subscribe((res) => {
        if (res.status) {
          console.log('Deleted sucessfully');
          window.location.reload();
          this.isLoading = false;
        } else {
          alert('Something Went Wrong');
        }
      });
    }
  }
  filterItems(arr: any, query: any) {
    return arr.filter((el: any) => el !== query);
  }
  openDialog(id: number, content: any) {
    console.log(content);
    this.modalData = [];
    const data = content;
    if (data) {
      // this.shareService.updateTodo(data)
      data.task.forEach((task: any) => {
        this.modalData.push(task);
      });
      this.editedTitle = data.title;
      this.dialog.open(DialogComponent, {
        data: {
          cardData: data,
        },
      });
    }
  }
}
