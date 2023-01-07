import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/authService/auth-service.service';
import { SnakbarService } from 'src/app/todoService/snakbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFrom = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private authService: AuthServiceService,
    private snakBar: SnakbarService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  registerUser() {
    console.warn(this.registerFrom.value);
    if (this.registerFrom.valid) {
      const user = this.registerFrom.value;
      this.authService.registerUser(user).subscribe((res) => {
        if (res.status) {
          this.snakBar.info(res.message);
          // localStorage.setItem('token', res.token);
          this.router.navigate(['/login']);
        } else {
          this.snakBar.info(res.message);
        }
      });
    }
  }
}
