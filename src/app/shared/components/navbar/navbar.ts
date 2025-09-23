import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { SessionButton } from '../session-button/session-button';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SessionButton, NgOptimizedImage, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar{
  year: number;

  currentSection: string = 'services';
  private threshold = 100;
  private stickyClass = 'scroll-sticky';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.updateStickyClass();
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });
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
