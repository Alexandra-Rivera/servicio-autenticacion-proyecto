import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AuthService } from 'colibrihub-shared-services';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  protected logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        this.route.queryParamMap.subscribe(params => {
          const returnUrl = params.get('redirect');

          if (returnUrl) {
            if (returnUrl.includes('localhost')) {
              window.location.href = `http://${returnUrl}`;
            } else {
              window.location.href = `https://${returnUrl}`;
            }
          } else {
            this.router.navigate(['/']);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
