import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../components/header/header";
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit, AfterViewInit {

  pizzas: any[] = [];
  openingHours: any[] = [];

  aboutText: string = "";
  homeText: string = "";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    this.http.get<any[]>("http://localhost:3000/menu")
      .subscribe(data => {

        this.pizzas = data;
        this.cdr.detectChanges();

      });

    this.http.get<any[]>("http://localhost:3000/pages")
      .subscribe(data => {

        const aboutPage = data.find(
          page => page.slug === "about"
        );

        const homePage = data.find(
          page => page.slug === "homepage"
        );

        this.aboutText = aboutPage.content;
        this.homeText = homePage.content;
        this.cdr.detectChanges();

      });

    this.http.get<any[]>("http://localhost:3000/opening-hours")
      .subscribe(data => {

        this.openingHours = data;
        this.cdr.detectChanges();

      });
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