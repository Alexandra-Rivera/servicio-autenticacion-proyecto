import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  LucideAngularModule,
  LucideEye,
  LucideEyeOff,
  LucideMoveRight,
  LucideUserLock,
  LucideUserPen
} from 'lucide-angular';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LucideAngularModule,
    RouterLink,
  ],  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  readonly eye = LucideEye;
  readonly eyeOff = LucideEyeOff;
  readonly moveRight = LucideMoveRight;
  readonly userPen = LucideUserPen;

  passwordForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateField(fieldName: string): boolean {
    const field = this.passwordForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.passwordForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      return 'La contraseña debe de tener al menos 6 caracteres';
    }
    return '';
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle password setting logic here (e.g., API call)
      // On success, navigate to the desired route
      this.router
        .navigate(['/auth-successful-password-modern'])
        .catch((err) => console.error('Navigation error:', err));
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
