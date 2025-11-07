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
import {MessageDto} from 'colibrihub-shared-dtos';
import {EmailValueService} from '../../../shared/services/email-value.service';
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
  private email: string = "Alexandra.rivera1102@gmail.com";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private emailValueService: EmailValueService,
    private codeVerificationService: CodeVerificationService,
    private toast: HotToastService,
  ) {
    this.passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/), Validators.pattern(/[!@#$%^&*()_+{}:;"'|\\<,>.?/-]/)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.passwordVerificationCode = this.codeVerificationService.getPasswordVerificationCode();
    this.email = this.emailValueService.getCurrentEmail();
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
      return 'La contraseña debe de tener al menos 8 caracteres';
    }
    if (field?.hasError('pattern')) {
      return 'La contraseña debe contener números y símbolos';
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
      if (this.isLoading()) return;

      this.isLoading.set(true);

      const data: UpdatePasswordDto = {
        email: this.email,
        code: this.passwordVerificationCode,
        password: this.passwordForm.value.password,
      }

      console.log("data:", data);
      this.accountService.updatePassword(data).subscribe(
        {
          next: () => {
            setTimeout(() => {
              this.isLoading.set(false);
              this.router.navigate(['forgotten-password/success']);
            }, 2000)
          },
          error: (error: MessageDto) => {
            this.isLoading.set(false);
            console.error(error);
            this.toast.error(error.message);
          }
        }
      )
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
