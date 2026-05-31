import { Component } from '@angular/core';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  successMessage= '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Funktion för att hantera inloggning
  loginUser() {
    this.errorMessage = '';
    this.successMessage = '';

    if(!this.email || !this.password) {
      this.errorMessage =
        'Alla fält måste fyllas i';
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    // Skicka inloggningsdata till backen
    this.http.post<any>(
      'http://localhost:3000/auth/login',
      loginData
    ).subscribe({

      // Hantera svar från servern
      next: (response) => {
        localStorage.setItem(
          'token',
          response.token
        );

        // Skickar användaren till dashboard vid lyckad inloggning
        this.router.navigate([
          '/admin/dashboard'
        ]);
      },

      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Fel e-postadress eller lösenord';

        this.cdr.detectChanges();
      }

    });
  }
}