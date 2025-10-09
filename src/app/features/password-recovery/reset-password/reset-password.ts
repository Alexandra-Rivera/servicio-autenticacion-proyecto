import {Component, signal} from '@angular/core';
import { Router } from '@angular/router';
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
  LucideEyeOff, LucideLoaderCircle,
  LucideMoveRight,
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
  ],  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  readonly eye = LucideEye;
  readonly eyeOff = LucideEyeOff;
  readonly userPen = LucideUserPen;
  readonly loaderCircle = LucideLoaderCircle;

  isLoading = signal(false);

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
      if (this.isLoading()) return;

      this.isLoading.set(true);

      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['forgotten-password/success']);
      }, 2000)
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
