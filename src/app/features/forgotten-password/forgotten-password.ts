import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {LucideAngularModule, LucideMoveRight, LucideUser} from 'lucide-angular';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordService} from '../../core/services/password.service';
import {EmailDto} from '../../models/email-dto';

@Component({
  selector: 'app-forgotten-password',
  imports: [RouterLink, LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgotten-password.html',
  styleUrl: './forgotten-password.css'
})
export class ForgottenPassword {
  readonly moveRight = LucideMoveRight;
  readonly user = LucideUser;
  protected email!: FormGroup;

  constructor(
    private passwordService: PasswordService,
    private fb: FormBuilder,
  ) {
    this.email = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  passwordRecovery() {
    if (this.email.valid) {
      const emailDto: EmailDto = this.email.value;

      this.passwordService.passwordRecovery(emailDto).pipe().subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error("Error message:", error.error.message);
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
