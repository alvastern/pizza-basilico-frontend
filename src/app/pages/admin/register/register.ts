import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, HeaderAdmin],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  registerUser() {
    if(
      !this.username ||
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
      username: this.username,
      email: this.email,
      password: this.password

    };

    this.http.post(
      'http://localhost:3000/register',
      userData
    ).subscribe({

      next: (response) => {
        this.router.navigate([
          '/admin/login'
        ]);
      },

      error: (error) => {
        this.errorMessage =
          error.error.message;
      }

    });
  }
}