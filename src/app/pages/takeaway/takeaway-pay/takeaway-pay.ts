import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-takeaway-pay',
  imports: [RouterLink, CommonModule],
  templateUrl: './takeaway-pay.html',
  styleUrl: './takeaway-pay.scss',
})
export class TakeawayPay {
  cart: any[] = [];

  ngOnInit() {
    const savedCart = localStorage.getItem("cart");

    if(savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  getTotal() {
    return this.cart.reduce(
      (total, pizza) =>
        total + (pizza.price * pizza.quantity), 0
    );
  }
}
