import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-takeaway-tack',
  imports: [CommonModule, RouterLink],
  templateUrl: './takeaway-tack.html',
  styleUrl: './takeaway-tack.scss',
})
export class TakeawayTack {}
