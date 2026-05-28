import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Booking {
  booking_id: number;
  name: string;
  booking_time: string;
  guest_number: number;
  booking_date: string;
  email: string;
  phone_number: string;
}

interface TakeawayOrder {
  order_id: number;
  name: string;
  phone_number: string;
  pickup_time: string;
  items: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderAdmin, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard implements OnInit {
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  selectedBooking: Booking | null = null;
  fromTable: any = null;

  bookings: Booking[] = [];

  selectedDate = new Date().toLocaleDateString('sv-CA');

  tables: {
    id: number;
    seats: number;
    booking: Booking | null
  }[] = [
    { id: 1, seats: 2, booking: null },
    { id: 2, seats: 2, booking: null },
    { id: 3, seats: 4, booking: null },
    { id: 4, seats: 4, booking: null },
    { id: 5, seats: 6, booking: null },
    { id: 6, seats: 6, booking: null }
  ];

  ngOnInit() {
    this.getBookings();
    this.getTakeawayOrders();
  }

  getBookings() {
    this.tables.forEach(table => {
      table.booking = null;
    });

    this.http.get<Booking[]>(`http://localhost:3000/table-bookings/date/${this.selectedDate}`).subscribe({

      next: (response) => {
        this.bookings = [...response];
        this.cdr.detectChanges();
        console.log(this.bookings);
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  dragStart(
    booking: Booking,
    fromTable: any = null
  ) {
    this.selectedBooking = booking;
    this.fromTable = fromTable;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dropBooking(
    table: { booking: Booking | null }
  ) {

    if(!this.selectedBooking) return;

    if(this.fromTable) {
      this.fromTable.booking = null;
    }

    table.booking = this.selectedBooking;

    this.bookings = this.bookings.filter(booking =>
      booking.booking_id !==
      this.selectedBooking?.booking_id
    );

    this.selectedBooking = null;
    this.fromTable = null;
  }

  returnBooking() {
    if(
      !this.selectedBooking ||
      !this.fromTable
    ) return;

    this.bookings.push(
      this.selectedBooking
    );

    this.fromTable.booking = null;
    this.selectedBooking = null;
    this.fromTable = null;
  }




  takeawayOrders: TakeawayOrder[] = [];

  getTakeawayOrders() {
    this.http.get<TakeawayOrder[]>('http://localhost:3000/takeaway').subscribe({
      
    next: (response) => {
      this.takeawayOrders = [...response];
      this.cdr.detectChanges();
      console.log(this.takeawayOrders);
    },

    error: (error) => {
      console.log(error);
    }
  });
}

completeOrder(orderId: number) {
    this.http.put(`http://localhost:3000/takeaway/complete/${orderId}`, {}).subscribe({next: () => {
      this.getTakeawayOrders();
    },

    error: (error) => {
      console.log(error);
    }
  });
}

}