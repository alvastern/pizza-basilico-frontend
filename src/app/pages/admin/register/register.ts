import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, HeaderAdmin, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  registerUser() {
    if(
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.errorMessage =
        'Alla fält måste fyllas i';
        return;
    }

    if(this.password !== this.confirmPassword) {
      this.errorMessage =
        'Lösenorden matchar inte';

      return;
    }

    if(this.password.length < 6) {
      this.errorMessage =
        'Lösenordet måste vara minst 6 tecken';

      return;
    }

    this.errorMessage = '';

    const userData = {
      email: this.email,
      password: this.password

    };

    this.http.post(
      'http://localhost:3000/auth/register',
      userData
    ).subscribe({

      next: (response) => {
        this.successMessage =
          'Konto har skapats!';

        setTimeout(() => {
          this.router.navigate([
            '/admin/login'
          ]);
        }, 1500);
      },

      error: (error) => {
        console.log(error);

        this.errorMessage =
          error.error.message;
      }

    });
  }
}