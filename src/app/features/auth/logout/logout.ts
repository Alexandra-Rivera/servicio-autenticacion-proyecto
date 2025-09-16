import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'colibrihub-shared-services';
import { SeoService } from '../../../core/services/seo.service';
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink, Footer],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout implements OnInit {
  ngOnInit(): void {
    this.seoService.updateTitle('Cerrar sesión');
  }

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly seoService: SeoService
  ) {}

  protected logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.route.queryParamMap.subscribe((params) => {
          const returnUrl = params.get('redirect');

          if (returnUrl) {
            if (returnUrl.includes('localhost')) {
              window.location.href = `http://${returnUrl}`;
            } else {
              window.location.href = `https://${returnUrl}`;
            }
          } else {
            window.location.href = '/';
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
