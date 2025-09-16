import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setAll({
      title: 'Plataforma de autenticación y gestión de usuarios',
      description: 'Bienvenido al módulo de autenticación y gestión de usuarios',
      og: {
        title: 'Plataforma de autenticación y gestión de usuarios',
        description: 'Bienvenido al módulo de autenticación y gestión de usuarios',
      }
    });
  }
}
