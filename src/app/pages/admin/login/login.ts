import { Component } from '@angular/core';
import { HeaderAdmin } from "../../../components/header/header-admin/header-admin";
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}