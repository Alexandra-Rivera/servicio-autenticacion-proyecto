import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LucideAngularModule, LucideLoaderCircle, LucideUser, LucideUserLock} from 'lucide-angular';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmailDto} from '../../../models/email-dto';
import {HotToastService} from '@ngxpert/hot-toast';
import {NgClass} from '@angular/common';
import {AccountService} from '../../../core/services/account.service';
import {EmailValueService} from '../../../shared/services/email-value.service';

@Component({
  selector: 'app-forgotten-password',
  imports: [RouterLink, LucideAngularModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './forgotten-password.html',
  styleUrl: './forgotten-password.css'
})
export class ForgottenPassword {
  readonly user = LucideUser;
  readonly userLock = LucideUserLock;
  readonly loaderCircle = LucideLoaderCircle;

  protected email!: FormGroup;

  isLoading = signal(false);

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private emailValueService: EmailValueService,
  ) {
    this.email = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  passwordRecovery() {
    if (this.email.valid) {
      if (this.isLoading()) return;

      this.isLoading.set(true);
      const emailDto: EmailDto = this.email.value;

      this.accountService.recoverPassword(emailDto).pipe().subscribe({
        next: () => {
          this.isLoading.set(false);

          this.emailValueService.clearEmail();
          const email = this.email.get('email')?.value as string;
          this.emailValueService.setEmail(email);
          this.router.navigate(['/forgotten-password/two-step-verification']);
        },
        error: error => {
          this.isLoading.set(false);
          this.toast.error(error.error.message);
        }
      });
    } else {
      this.email.markAsTouched();
    }
  }

  validateField (): boolean {
    const field = this.email.get('email');

    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(): string {
    const field = this.email.get('email');
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Ingresa una dirección válida de email';
    }

    return '';
  }
}
