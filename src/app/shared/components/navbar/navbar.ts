import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import AOS from 'aos';
import { SessionButton } from '../session-button/session-button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {filter} from 'rxjs';
import {LucideAngularModule, LucideX, Menu} from 'lucide-angular';
import {LinkContent} from '../link-content/link-content';
import {AppTitle} from '../app-title/app-title';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton, NgClass, LucideAngularModule, LinkContent, AppTitle, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  //Icons
  readonly menu = Menu;
  readonly x = LucideX;

  private threshold = 100;
  private stickyClass = 'scroll-sticky';

  currentRoute = "/";
  isMenuOpen = false;
  appTitle = "Colibrihub Systems";

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateStickyClass();
  }

  private updateStickyClass(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    if (offset > this.threshold) {
      this.renderer.addClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    }
  }

  ngOnInit(): void {
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });

    // Suscribirse a los eventos del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      console.log(this.currentRoute);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
