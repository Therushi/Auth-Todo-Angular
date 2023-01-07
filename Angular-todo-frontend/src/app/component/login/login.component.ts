import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/authService/auth-service.service';
import { SnakbarService } from 'src/app/todoService/snakbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private loginService: AuthServiceService,
    private snakBar: SnakbarService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.loginForm.value);
    const user = this.loginForm.value;
    if (user && this.loginForm.valid) {
      this.loginService.loginUser(user).subscribe((res) => {
        if (res.status) {
          this.snakBar.info(res.message);
          console.log(res, 'RESPONSE');
          localStorage.setItem('userId', res.user?._id);
          localStorage.setItem('userName', res.user?.userName);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
