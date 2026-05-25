import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-boka-bord-tack',
  imports: [RouterLink, Header],
  templateUrl: './boka-bord-tack.html',
  styleUrl: './boka-bord-tack.scss',
})
export class BokaBordTack {}
