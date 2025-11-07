import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-link-content',
  imports: [],
  templateUrl: './link-content.html',
  styleUrl: './link-content.css'
})
export class LinkContent {
  currentSection: string = '';

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.detectCurrentSection();
  }

  private detectCurrentSection(): void {
    const sections = [
      'servicios',
      'pricing',
      'modulos',
      'faqs',
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
