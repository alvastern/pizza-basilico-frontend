import { Component } from '@angular/core';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [HeaderAdmin, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  loginUser() {
    this.errorMessage = '';

    if(!this.email || !this.password) {
      this.errorMessage =
        'Alla fält måste fyllas i';
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:3000/auth/login',
      loginData
    ).subscribe({

      next: (response) => {
        localStorage.setItem(
          'token',
          response.token
        );

        this.router.navigate([
          '/admin/dashboard'
        ]);
      },

      error: (error) => {
        console.log(error);

        this.errorMessage =
          error.error?.message ||
          'Fel e-postadress eller lösenord';
      }
      
    });
  }
}