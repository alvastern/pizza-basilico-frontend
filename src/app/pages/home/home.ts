import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {

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

    this.http.get<any[]>("http://localhost:3000/information")
      .subscribe(data => {

        const aboutPage = data.find(
          page => page.slug === "about"
        );

        const homePage = data.find(
          page => page.slug === "homepage"
        );

        this.aboutText = aboutPage.content;
        this.homeText = homePage.content;

      });

    this.http.get<any[]>("http://localhost:3000/opening-hours")
      .subscribe(data => {

        this.openingHours = data;

      });
  }
}