import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import AOS from 'aos';
import { SessionButton } from '../session-button/session-button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton, NgOptimizedImage, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isLoginRoute: boolean = false;

  currentSection: string = '';
  private threshold = 100;
  private stickyClass = 'scroll-sticky';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.isLoginRoute = event.urlAfterRedirects === '/login' || event.url === '/login';
    })
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateStickyClass();
    this.detectCurrentSection();
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section;
    }
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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

  private detectCurrentSection(): void {
    const sections = [
      'services',
      'pricing',
      'features',
      'templates',
      'faq',
      'updates',
    ];
    let currentSection = this.currentSection;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          currentSection = section;
          break;
        }
      }
    }

    this.currentSection = currentSection;
  }
}
