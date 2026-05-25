import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})

export class Order implements OnInit {

  pizzas: any[] = [];
  cart: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.http.get<any[]>("http://localhost:3000/menu")
      .subscribe(data => {
        this.pizzas = data;
        this.cdr.detectChanges();
      });

    const savedCart = localStorage.getItem("cart");
      if(savedCart) {
        this.cart = JSON.parse(savedCart);
      }
  }

  addToCart(pizza: any) {
    const existingPizza = this.cart.find(
      item => item.item_id === pizza.item_id
    );

    if(existingPizza) {
      existingPizza.quantity++;
    } else {
      this.cart.push({
        ...pizza,
        quantity: 1
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  increaseQuantity(pizza: any) {
    pizza.quantity++;

    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  decreaseQuantity(pizza: any) {
    if(pizza.quantity > 1) {
      pizza.quantity--;
    } else {

      this.cart = this.cart.filter(
        item => item.item_id !== pizza.item_id
      );
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(this.cart)
    );
  }

  getTotal() {
    return this.cart.reduce(
      (total, pizza) =>
        total + (pizza.price * pizza.quantity), 0
    );
  }

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
}
