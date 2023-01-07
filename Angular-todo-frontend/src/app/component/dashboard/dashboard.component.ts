import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    if (this.userName) {
      this.isLoggedIn = true;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
