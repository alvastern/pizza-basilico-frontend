import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss',
})
export class HeaderAdmin {
  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('token');

    this.router.navigate([
      '/admin/login'
    ]);

  }
}
