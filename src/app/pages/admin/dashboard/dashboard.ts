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
  selectedPizza: any = null;

  bookings: Booking[] = [];
  menuItems: any[] = [];
  openingHours: any[] = [];

  isMenuOpen = false;
  showMenuForm = false;
  isAboutOpen = false;

  aboutText = '';
  homepageText = '';

  menuForm = {
    title: '',
    description: '',
    price: null,
    image: ''
  };

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
    this.getMenuItems();
    this.getAboutText();
    this.getOpeningHours();
    this.getHomepageText();
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

getMenuItems() {

  this.http.get<any[]>(
    'http://localhost:3000/menu'
  ).subscribe({

    next: (response) => {

      this.menuItems = response;

    },

    error: (error) => {

      console.log(error);

    }

  });

}

editPizza(pizza: any) {

  this.selectedPizza = pizza;

  this.menuForm = {

    title: pizza.title,
    description: pizza.description,
    price: pizza.price,
    image: pizza.image

  };

  this.showMenuForm = true;

}

openAddPizza() {

  this.selectedPizza = null;

  this.menuForm = {

    title: '',
    description: '',
    price: null,
    image: ''

  };

  this.showMenuForm = true;

}

savePizza() {

  const token = localStorage.getItem("token");

  // REDIGERA
  if(this.selectedPizza) {

    this.http.put(
      `http://localhost:3000/menu/${this.selectedPizza.item_id}`,
      this.menuForm,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    ).subscribe({

      next: () => {

        this.getMenuItems();

        this.showMenuForm = false;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

  // LÄGG TILL
  else {

    this.http.post(
      'http://localhost:3000/menu',
      this.menuForm,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    ).subscribe({

      next: () => {

        this.getMenuItems();

        this.showMenuForm = false;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

}

deletePizza(itemId: number) {

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  if(!confirm("Är du säker på att du vill ta bort pizzan?")) {
    return;
  }

  this.http.delete(
    `http://localhost:3000/menu/${itemId}`,
    { headers }
  ).subscribe({

    next: () => {

      this.getMenuItems();

    },

    error: (error) => {

      console.log(error);

    }

  });

}

getAboutText() {

  this.http.get<any>(
    'http://localhost:3000/pages/about'
  ).subscribe({

    next: (response) => {

      console.log("ABOUT:", response);

      this.aboutText = response.content;

    }
  });
}

getOpeningHours() {
  this.http.get<any[]>(
    'http://localhost:3000/opening-hours'
  ).subscribe({

    next: (response) => {
      this.openingHours = response.map(hour => ({
        ...hour,
        open_time: hour.open_time ? hour.open_time.slice(0, 5) : '',
        close_time: hour.close_time ? hour.close_time.slice(0, 5) : ''
      }));

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.log(error);
    }

  });
}

getHomepageText() {

  this.http.get<any>(
    'http://localhost:3000/pages/homepage'
  ).subscribe({

    next: (response) => {

      console.log("HOMEPAGE:", response);

      this.homepageText = response.content;

    }
  });
}

saveAbout() {

  const token =
    localStorage.getItem("token");

  this.http.put(

    'http://localhost:3000/pages/1',

    {
      content: this.aboutText
    },

    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }

  ).subscribe({

    next: () => {

      alert(
        'Om oss-text sparad'
      );

    },

    error: (error) => {

      console.log(error);

    }

  });

}

saveHomepage() {

  const token =
    localStorage.getItem("token");

  this.http.put(

    'http://localhost:3000/pages/2',

    {
      content: this.homepageText
    },

    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }

  ).subscribe({

    next: () => {

      alert(
        'Introduktionstext sparad'
      );

    },

    error: (error) => {

      console.log(error);

    }

  });

}

saveHours() {

  const token =
    localStorage.getItem("token");

  this.openingHours.forEach(hour => {

    this.http.put(

      `http://localhost:3000/opening-hours/${hour.hours_id}`,

      hour,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    ).subscribe();

  });

  alert(
    'Öppettider sparade'
  );

}
}