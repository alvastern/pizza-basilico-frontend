import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-boka-bord-info',
  imports: [RouterLink, Header, CommonModule, FormsModule],
  templateUrl: './boka-bord-info.html',
  styleUrl: './boka-bord-info.scss',
})

export class BokaBordInfo {
  bookingDate = '';
  bookingTime = '';
  guestNumber = '';
  name = '';
  email = '';
  phoneNumber = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Funktion för att boka bord
  bookTable() {
    const bookingData = {
      name: this.name,
      email: this.email,
      phone_number: this.phoneNumber,
      guest_number: this.guestNumber,
      booking_date: this.bookingDate,
      booking_time: this.bookingTime
    };

    // Skickar bokningsdatan till backend och hanterar svaret
    this.http.post(
        'https://pizza-basilico-api.onrender.com/table-bookings',
        bookingData
      ).subscribe({

        next: () => {
          this.router.navigateByUrl('/boka-bord/tack');
        },

        error: () => {
          alert('Något gick fel');
        }

      });

  }
}