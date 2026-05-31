import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-admin',
  imports: [CommonModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss',
})

export class HeaderAdmin {
  constructor (public router: Router) {}

  // Loggar ut användaren när token tagits bort från local storage och navigerar till login-sidan
  logout() {
    localStorage.removeItem('token');

    this.router.navigate([
      '/admin/login'
    ]);

  }
}
