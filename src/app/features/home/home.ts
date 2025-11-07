import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import {
  LucideAngularModule, LucideChevronDown, LucideChevronUp, LucideClipboardCheck, LucideContact,
  LucideNewspaper, LucidePercent,
  LucideTicket, LucideUser, LucideUserStar,
} from 'lucide-angular';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import AOS from 'aos';
@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  readonly chevronDown = LucideChevronDown;
  readonly chevronUp = LucideChevronUp;

  readonly clipboardCheck = LucideClipboardCheck;
  readonly user  = LucideUser;
  readonly ticket = LucideTicket;
  readonly userStar = LucideUserStar;
  readonly percent = LucidePercent;
  readonly newspaper = LucideNewspaper;
  readonly contact = LucideContact;

  year: number;

  constructor() {
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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /*Esto es lo del acordion de las preguntas FAQ*/
  selected: number | null = null;

  accordionItems = [
    {
      title: '¿Qué significa la modularización?',
      contentType: 'text',
      content: `Significa que cada módulo del sistema está dividido y a diferencia de otras aplicaciones cada módulo es independiente del otro. Es como si cada parte de la aplicación fuera una aplicación independiente en sí misma.`
    },
    {
      title: '¿Cómo puedo crear una cuenta?',
      contentType: 'list',
      header: 'Aquí tienes los pasos para crear una cuenta en Colibrihub System:',
      content: [
        'Da click al botón de Registrarme ubicado en la barra de navegación.',
        'Ingresa tus datos en el formulario de registro > Ingresa el código de verificación que te caerá a tu correo electrónico > Si todo ha ido bien, te aparecerá un mensaje de éxito en pantalla.',
        '¡Y listo! Ya tienes una cuenta para ingresar a los demás módulos de Colibrihub System.'
      ]
    },
    {
      title: '¿Cómo puedo ingresar a otros módulos?',
      contentType: 'text',
      content: `Puedes hacerlo mediante los links ubicados en el pie de página de esta sección o también con los links ubicados en la sección de Módulos de la Aplicación`
    },
    {
      title: '¿Por qué tengo que autenticarme cada vez que quiero entrar a un módulo?',
      contentType: 'text',
      content: `Aunque cada módulo funciona como una aplicación en sí misma, siempre necesitas autenticarte, es una capa de seguridad que ofrece el sistema para que ningún usuario no autorizado tenga acceso.`
    },
    {
      title: '¿Es posible recuperar mi contraseña?',
      contentType: 'text',
      content: `Sí, sólo tienes que dar click al botón de Iniciar de Sesión y en el formulario verás un link que permitirá ingresar tu correo electrónico para seguir con el proceso de recuperación de contraseña.`
    }
  ];

  toggleItem(index: number): void {
    this.selected = this.selected === index ? null : index;
  }

  // Helper method to ensure content is an array for ngFor
  isArray(content: string | string[]): content is string[] {
    return Array.isArray(content);
  }
}
