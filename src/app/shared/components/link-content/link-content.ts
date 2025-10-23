import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-link-content',
  imports: [],
  templateUrl: './link-content.html',
  styleUrl: './link-content.css'
})
export class LinkContent {
  private threshold = 100;
  private stickyClass = 'scroll-sticky';
  currentSection: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateStickyClass();
    this.detectCurrentSection();
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

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section;
    }
  }

}
