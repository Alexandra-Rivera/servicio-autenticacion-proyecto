import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import AOS from 'aos';
import { SessionButton } from '../session-button/session-button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {filter} from 'rxjs';
import {LucideAngularModule, LucideX, Menu} from 'lucide-angular';
import {LinkContent} from '../link-content/link-content';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton, NgOptimizedImage, NgClass, LucideAngularModule, LinkContent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  //Icons
  menu = Menu;
  x = LucideX;

  currentRoute: string = "/";
  isMenuOpen = false;

  constructor(
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });

    // Suscribirse a los eventos del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verificar si la URL actual es la del "Home"
      this.currentRoute = event.url;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
