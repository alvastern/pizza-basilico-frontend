import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from "../../../components/header/header";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takeaway-pay',
  imports: [RouterLink, CommonModule, Header],
  templateUrl: './takeaway-pay.html',
  styleUrl: './takeaway-pay.scss',
})

export class TakeawayPay {

  constructor(private http: HttpClient) {}

  cart: any[] = [];
  orderInfo: any = {};

  // Hämtar varukorg och orderinfo från local storage
  ngOnInit() {
    const savedCart = localStorage.getItem("cart");
    if(savedCart) {
      this.cart = JSON.parse(savedCart);
    }

    const savedInfo = localStorage.getItem("orderInfo");
    if(savedInfo) {
      this.orderInfo = JSON.parse(savedInfo);
    }
  }

  // Funktion för att räkna ut den totala kostnaden i varukorgen
  getTotal() {
    return this.cart.reduce(
      (total, pizza) =>
        total + (pizza.price * pizza.quantity), 0
    );
  }

  // Funktion för att genomföra betalning och skicka orderdata till backend
  placeOrder() {
    const orderData = {
      name: this.orderInfo.name,
      email: this.orderInfo.email,
      phone_number: this.orderInfo.phone_number,
      pickup_time: this.orderInfo.pickup_time,

      total_price: this.getTotal(),

      items: this.cart.map(pizza => ({
        item_id: pizza.item_id,
        quantity: pizza.quantity
    }))

  };

    // Skickar orderdata till backend och hanterar svaret
    this.http.post('http://localhost:3000/takeaway', orderData).subscribe({next: () => {
        localStorage.removeItem("cart");
        localStorage.removeItem("orderInfo");

        window.location.href = "/takeaway/tack";
      },

      error: (error) => {
        console.log(error);
      }

    });
  }
}
