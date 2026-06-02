import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Interface för bokningar
interface Booking {
  booking_id: number;
  name: string;
  booking_time: string;
  guest_number: number;
  booking_date: string;
  email: string;
  phone_number: string;
}

// Interface för takeaway-beställningar
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

  menuForm = {title: '', description: '', price: null, image: ''};

  selectedDate = new Date().toLocaleDateString('sv-CA');

  // Definierar bord med antal platser i restaurangen
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

  // Hämtar data när komponenten initieras
  ngOnInit() {
    this.getBookings();
    this.getTakeawayOrders();
    this.getMenuItems();
    this.getAboutText();
    this.getOpeningHours();
    this.getHomepageText();
  }

  // Funktion som hämtar bokningar för det valda datumet och uppdaterar bordens status
  getBookings() {
    this.tables.forEach(table => {
      table.booking = null;
    });

    this.http.get<Booking[]>(`https://pizza-basilico-api.onrender.com/table-bookings/date/${this.selectedDate}`).subscribe({

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

  // Funktion för att hantera drag/drop av boknigar mellan bord och bokningslista
  dragStart(
    booking: Booking,
    fromTable: any = null
  ) {
    this.selectedBooking = booking;
    this.fromTable = fromTable;
  }

  // Tillåter att släppa en bokning på ett bord
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  // Funktion som hanterar drag/drop-funktion för bordsbokningar
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

  // Funktion som hanterar att en bokning dras tillbaka till bokningslistan
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

  // Takeaway-beställningar
  takeawayOrders: TakeawayOrder[] = [];

    // Funktion som hämtar takeaway-beställningar
    getTakeawayOrders() {
      const token = localStorage.getItem("token");

      this.http.get<TakeawayOrder[]>(
        'https://pizza-basilico-api.onrender.com/takeaway',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).subscribe({

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

  // Funktion som markerar en färdig beställning
  completeOrder(orderId: number) {
    const token = localStorage.getItem("token");

    this.http.put(
      `https://pizza-basilico-api.onrender.com/takeaway/complete/${orderId}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({next: () => {
          this.getTakeawayOrders();
          alert("Beställning färdig!");
        },

        error: (error) => {
          console.log(error);
        }
    });
  }

  // Funktion som hämtar menyposter
  getMenuItems() {
    this.http.get<any[]>('https://pizza-basilico-api.onrender.com/menu').subscribe({
      next: (response) => {
        this.menuItems = response;
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  // Funktion för att visa redigering för en pizza i menyn
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

  // Funktion för att lägga till en ny pizza i menyn
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

  // Funktion för att spara ändringar eller lägga till en ny pizza i menyn
  savePizza() {
    const token = localStorage.getItem("token");

    if(this.selectedPizza) {
      this.http.put(`https://pizza-basilico-api.onrender.com/menu/${this.selectedPizza.item_id}`,
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
          alert("Menyn uppdaterades!");
        },

        error: (error) => {
          console.log(error);
        }
      });
    }

    else {
      this.http.post('https://pizza-basilico-api.onrender.com/menu',
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
          alert("Pizzan lades till!");
        },

        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // Funktion för att radera en pizza från menyn
  deletePizza(itemId: number) {
    const token = localStorage.getItem("token");

    const headers = {Authorization: `Bearer ${token}`};

    if(!confirm("Är du säker på att du vill ta bort pizzan?")) {
      return;
    }

    this.http.delete(`https://pizza-basilico-api.onrender.com/menu/${itemId}`, { headers }).subscribe({
      next: () => {
        this.getMenuItems();
        alert("Pizzan togs bort!");
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  // Funktion som hämtar textparagrafer om företaget
  getAboutText() {
    this.http.get<any>('https://pizza-basilico-api.onrender.com/pages/about').subscribe({
      next: (response) => {
        console.log("ABOUT:", response);
        this.aboutText = response.content;
      }
    });
  }

  // Funktion som hämtar restaurangens öppettider
  getOpeningHours() {
    this.http.get<any[]>('https://pizza-basilico-api.onrender.com/opening-hours').subscribe({

      next: (response) => {
        this.openingHours = response.map(hour => ({
          ...hour,
          open_time: hour.open_time ? hour.open_time.slice(0, 5) : '', // Formaterar om tiden
          close_time: hour.close_time ? hour.close_time.slice(0, 5) : '' // Formaterar om tiden
        }));
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  // Funktion som hämtar textparagrafen för startsidan
  getHomepageText() {
    this.http.get<any>('https://pizza-basilico-api.onrender.com/pages/homepage').subscribe({
      next: (response) => {
        console.log("HOMEPAGE:", response);
        this.homepageText = response.content;
      }
    });
  }

  // Funktion som sparar texten om företaget
  saveAbout() {
    const token = localStorage.getItem("token");

    this.http.put('https://pizza-basilico-api.onrender.com/pages/1',

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

  // Funktion som sparar texten på startsidan
  saveHomepage() {
    const token = localStorage.getItem("token");

    this.http.put('https://pizza-basilico-api.onrender.com/pages/2',

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

  // Funktion som sparar öppettiderna
  saveHours() {
    const token = localStorage.getItem("token");

    this.openingHours.forEach(hour => {
      this.http.put(`https://pizza-basilico-api.onrender.com/opening-hours/${hour.hours_id}`, hour,

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