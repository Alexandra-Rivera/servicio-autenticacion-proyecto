import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionButton } from '../session-button/session-button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar{
}
