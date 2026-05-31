import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  menuOpen = false;

  // Toogle-funktion för att öppna och stänga meny på små skärmar
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}