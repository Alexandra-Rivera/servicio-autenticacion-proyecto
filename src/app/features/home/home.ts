import {
  Component,
  inject,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import {
  Fan,
  GalleryVerticalEndIcon,
  LucideAngularModule, LucideChevronDown, LucideChevronUp, LucideMoon,
  LucideMoveRight, LucideSun, User
} from 'lucide-angular';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import AOS from 'aos';
import {Footer} from '../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  readonly fan = Fan;
  readonly MoveRight = LucideMoveRight;
  readonly galleryVerticalEnd = GalleryVerticalEndIcon;
  readonly moon = LucideMoon;
  readonly sun = LucideSun;
  readonly chevronDown = LucideChevronDown;
  readonly chevronUp = LucideChevronUp;

  year: number;
  isDarkMode: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.year = new Date().getFullYear();
  }

  private seoService = inject(SeoService);

  ngOnInit(): void {
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });

    // SEO SERVICE
    this.seoService.setAll({
      title: 'Plataforma de autenticación y gestión de usuarios',
      description: 'Bienvenido al módulo de autenticación y gestión de usuarios',
      og: {
        title: 'Plataforma de autenticación y gestión de usuarios',
        description: 'Bienvenido al módulo de autenticación y gestión de usuarios',
      }
    });
  }



  /**Esto es lo del acordion de las preguntas FAQ**/
  selected: number | null = null;

  accordionItems = [
    {
      title: 'What are the features of email?',
      contentType: 'text',
      content: `Emails are automatically date and time stamped. Signatures can be attached. Files, graphics, and sound can be sent as attachments in compressed formats. Features include webmail and mobile email.`
    },
    {
      title: 'How do you use email features?',
      contentType: 'list',
      header: 'Change smart features & personalization settings',
      content: [
        'On your Android phone or tablet, open Gmail.',
        'Tap Menu > Settings > the account you want to change.',
        'Scroll to the "General" section.'
      ]
    },
    {
      title: 'What is the main use of email?',
      contentType: 'text',
      content: `Email is a convenient way to communicate with individuals or small groups. It enables users to send and receive documents, images, links, and other files. It provides flexibility to communicate on one's schedule, with notifications, reminders, and follow-ups.`
    },
    {
      title: 'How email really works?',
      contentType: 'text',
      content: `The email client (web, mobile, or desktop) connects to the Outgoing SMTP server using the email account. It hands over the email in MIME format to the SMTP server, which validates the sender's details and processes the message for sending.`
    },
    {
      title: 'What are emails used for?',
      contentType: 'text',
      content: `Email is used for various purposes, including contacting friends, communicating with supervisors, requesting information, and applying for jobs, internships, and scholarships.`
    }
  ];

  toggleItem(index: number): void {
    this.selected = this.selected === index ? null : index;
  }

  /**Se utiliza para cambiar de modo claro a modo oscuro**/
  toggleMode() {
    const modeElement = document.querySelector('[data-mode]');
    if (modeElement) {
      const currentMode = modeElement.getAttribute('data-mode');
      const newMode = currentMode === 'light' ? 'dark' : 'light';

      // Set the new mode in the data attribute
      modeElement.setAttribute('data-mode', newMode);

      // Update the isDarkMode property
      this.isDarkMode = newMode === 'dark';

      // Optionally toggle a class on the body
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark');
      }
    }
  }

  // Helper method to ensure content is an array for ngFor
  isArray(content: string | string[]): content is string[] {
    return Array.isArray(content);
  }
}
