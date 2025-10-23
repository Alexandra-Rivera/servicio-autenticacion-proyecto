import { Component, signal} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  LucideAngularModule,
  LucideEye,
  LucideEyeOff,
  LucideLoaderCircle,
  User
} from 'lucide-angular';
import {ScrollService} from '../../../shared/services/scroll.service';
import {Router, RouterLink} from '@angular/router';
import {AccountService} from '../../../core/services/account.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {NgClass} from '@angular/common';
import {RegisterUserDto} from '../../../models/register-user-dto';
import {EmailValueService} from '../../../shared/services/email-value.service';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    LucideAngularModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  //icons
  readonly eye = LucideEye;
  readonly eyeOff = LucideEyeOff;
  readonly user = User;
  readonly loaderCircle = LucideLoaderCircle;

  signUpForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private scrollService: ScrollService,
    private accountService: AccountService,
    private emailValueService: EmailValueService,
    private toast: HotToastService,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/), Validators.pattern(/[!@#$%^&*()_+{}:;"'|\\<,>.?/-]/)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Custom validator for matching passwords
  passwordsMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  };

  validateField(fieldName: string): boolean {
    const field = this.signUpForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.signUpForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Ingresa una dirección válida de email';
    }
    if (field?.hasError('minlength')) {
      return 'La contraseña debe de tener al menos 8 caracteres';
    }
    if (field?.hasError('pattern')) {
      return 'La contraseña debe contener números y símbolos';
    }
    if (fieldName === 'confirmPassword' && field?.hasError('mismatch')) {
      return 'Las contraseñas no concuerdan';
    }
    return '';
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      if (this.isLoading()) return;

      this.isLoading.set(true);

      console.log("isLoading:", this.isLoading());
      const registerUserDto: RegisterUserDto = {
        id: 0,
        username: this.signUpForm.get('userName')?.value,
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
      }

      this.accountService.register(registerUserDto).subscribe(
        {
          next: (res) => {
            this.toast.success(res.message);
            this.isLoading.set(false);
            this.emailValueService.setEmail(registerUserDto.email);
            this.router.navigate(['/two-step-verification']).then(() => {});
          },
          error: err => {
            this.toast.error(`${err.error.message} :(`);
            this.isLoading.set(false);
          }
        }
      )
    } else {
      // Mark all fields as touched to trigger validation
      this.signUpForm.markAllAsTouched();
    }
  }
}
