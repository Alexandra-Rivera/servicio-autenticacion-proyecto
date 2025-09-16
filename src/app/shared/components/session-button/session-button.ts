import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from 'colibrihub-shared-components';
import { ValidationService } from 'colibrihub-shared-services';

@Component({
  selector: 'session-button',
  imports: [RouterLink, Auth],
  templateUrl: './session-button.html',
  styleUrl: './session-button.css',
})
export class SessionButton implements OnInit {
  private readonly validateService = inject(ValidationService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected isValid = signal(false);

  ngOnInit(): void {
    this.validateService.validate().subscribe({
      next: (res) => {
        this.isValid.set(true)
      },
      error: () => {
        this.isValid.set(false);
      },
    });
  }
}
