import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-boka-bord-info',
  imports: [RouterLink, Header],
  templateUrl: './boka-bord-info.html',
  styleUrl: './boka-bord-info.scss',
})
export class BokaBordInfo {}
