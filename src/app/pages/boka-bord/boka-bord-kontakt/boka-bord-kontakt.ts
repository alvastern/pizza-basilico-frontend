import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-boka-bord-kontakt',
  imports: [RouterLink, Header],
  templateUrl: './boka-bord-kontakt.html',
  styleUrl: './boka-bord-kontakt.scss',
})
export class BokaBordKontakt {}
