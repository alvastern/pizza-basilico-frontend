import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from "../../../components/header/header";

// Visar tack-sida för när en beställning har gjorts
@Component({
  selector: 'app-takeaway-tack',
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './takeaway-tack.html',
  styleUrl: './takeaway-tack.scss',
})
export class TakeawayTack {}
