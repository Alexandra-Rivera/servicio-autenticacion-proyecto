import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { Auth } from 'colibrihub-shared-components';
import { ValidationService } from 'colibrihub-shared-services';
import {LucideAngularModule, LucideCircleUserRound, User} from 'lucide-angular';
import {filter} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'session-button',
  imports: [RouterLink, Auth, LucideAngularModule],
  templateUrl: './session-button.html',
  styleUrl: './session-button.css',
})
export class SessionButton implements OnInit {
  readonly user = LucideCircleUserRound;

  private readonly validateService = inject(ValidationService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected isValid = signal(false);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.validateService.validate().subscribe({
      next: (res) => {
        this.isValid.set(true);
      },
      error: () => {
        this.isValid.set(false);
      },
    });
  }

  backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
