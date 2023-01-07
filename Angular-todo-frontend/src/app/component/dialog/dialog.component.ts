import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  cardInfo!: Todo;
  editedTodo = new FormGroup({
    editedTask : new FormControl('')
    
  })
  isEdit: boolean = false;
  ngOnInit(): void {
    if (this.data) {
      this.cardInfo = this.data?.cardData;
    } 
  }
  deleteTask(index: number) {
    if (index) {
      this.cardInfo.task.splice(index, 1);
    }
  }
  editTodo(CardInfo: Todo) {
    console.log(CardInfo,"Todo")
  }
  onEditTask(index: number) {
    this.isEdit = true;
  }
}
