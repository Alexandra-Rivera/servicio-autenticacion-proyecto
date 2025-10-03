import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LucideAngularModule, LucideLoaderCircle, LucideMoveRight, LucideUser, LucideUserLock} from 'lucide-angular';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordService} from '../../core/services/password.service';
import {EmailDto} from '../../models/email-dto';
import {HotToastService} from '@ngxpert/hot-toast';
import {NgClass} from '@angular/common';

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
    private passwordService: PasswordService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
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

      this.passwordService.passwordRecovery(emailDto).pipe().subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toast.success("Código generado con éxito, revise su correo");
          this.router.navigate(['/two-step-verification']);
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
