import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import AOS from 'aos';
import { SessionButton } from '../session-button/session-button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {filter, Subject, takeUntil} from 'rxjs';
import {LucideAngularModule, LucideX, Menu} from 'lucide-angular';
import {LinkContent} from '../link-content/link-content';
import {AppTitle} from '../app-title/app-title';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton, NgClass, LucideAngularModule, LinkContent, AppTitle, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  //Icons
  readonly menu = Menu;
  readonly x = LucideX;

  private destroy$ = new Subject<void>(); // Gestiona una subscripción
  currentRoute = "/";
  isMenuOpen = false;
  appTitle = "Colibrihub Systems";

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
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      console.log(this.currentRoute);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
