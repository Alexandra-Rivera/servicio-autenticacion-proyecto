import {Component, OnInit, signal} from '@angular/core';
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
  LucideUserPen
} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {CodeVerificationService} from '../../../shared/services/code-verification.service';
import {UpdatePasswordDto} from '../../../models/update-password-dto';
import {AccountService} from '../../../core/services/account.service';
import {HotToastService} from '@ngxpert/hot-toast';
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
export class ResetPassword implements OnInit {
  readonly eye = LucideEye;
  readonly eyeOff = LucideEyeOff;
  readonly userPen = LucideUserPen;
  readonly loaderCircle = LucideLoaderCircle;

  isLoading = signal(false);

  passwordForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private passwordVerificationCode: string = "";
  protected email: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private codeVerificationService: CodeVerificationService,
    private toast: HotToastService,
  ) {
    this.passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.passwordVerificationCode = this.codeVerificationService.getPasswordVerificationCode();
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

      const data: UpdatePasswordDto = {
        email: this.email,
        code: this.passwordVerificationCode,
        password: this.passwordForm.value.password,
      }

      this.accountService.updatePassword(data).subscribe(
        {
          next: success => {
            setTimeout(() => {
              this.isLoading.set(false);
              this.router.navigate(['forgotten-password/success']);
            }, 2000)
          },
          error: error => {
            this.toast.error(error.error.message);
          }
        }
      )
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
