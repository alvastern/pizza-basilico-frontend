import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})

export class Order implements OnInit {
  pizzas: any[] = [];
  cart: any[] = [];

  name = '';
  email = '';
  phone_number = '';
  pickup_time = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  // Hämtar data för meny och sparar varukorg i local storage
  ngOnInit() {
    this.http.get<any[]>("https://pizza-basilico-api.onrender.com/menu")
      .subscribe(data => {
        this.pizzas = data;
        this.cdr.detectChanges();
      });

    // Hämtar varukorg från local storage om den finns
    const savedCart = localStorage.getItem("cart");
      if(savedCart) {
        this.cart = JSON.parse(savedCart);
      }
  }

  // Funktion för att hantera varukorg
  addToCart(pizza: any) {
    const existingPizza = this.cart.find(
      item => item.item_id === pizza.item_id
    );

    // Om pizzan redan finns, öka med en, annars lägg i varukorgen
    if(existingPizza) {
      existingPizza.quantity++;
    } else {
      this.cart.push({
        ...pizza,
        quantity: 1
      });
    }

    // Sparar i local storage när varukorgen uppdateras
    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  // Funktion för att öka antal av en pizza i varukorgen
  increaseQuantity(pizza: any) {
    pizza.quantity++;

    // uppdaterar local storage
    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  // Funktion för att minska antal av en pizza i varukorgen 
  decreaseQuantity(pizza: any) {
    if(pizza.quantity > 1) {
      pizza.quantity--;
    } else {

      this.cart = this.cart.filter(
        item => item.item_id !== pizza.item_id
      );
    }

    // Uppdaterar local storage
    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  // Funktion för att räkna ut den totala kostnaden i varukorgen
  getTotal() {
    return this.cart.reduce(
      (total, pizza) =>
        total + (pizza.price * pizza.quantity), 0
    );
  }

  // Scroll-fade animation på elemenr när de kommer in i viewport
  ngAfterViewInit() {
    const elements = document.querySelectorAll('.scroll-fade');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if(entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });
  }

  // Funktion för att spara orderinformation i local storage
  saveOrderInfo() {
    const orderInfo = {

      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      pickup_time: this.pickup_time

    };

    localStorage.setItem(
      "orderInfo",
      JSON.stringify(orderInfo)
    );

  }
}
