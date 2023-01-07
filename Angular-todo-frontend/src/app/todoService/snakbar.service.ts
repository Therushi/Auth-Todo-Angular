import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  panelClass = ["green-snackbar"]

  constructor(private _snackBar: MatSnackBar) { }

  info(message:string){
    return this._snackBar.open(message,undefined,{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass:this.panelClass
    })
  }
}
