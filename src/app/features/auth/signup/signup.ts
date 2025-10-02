import {ChangeDetectorRef, Component, signal} from '@angular/core';
import {Footer} from '../../../shared/components/footer/footer';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {LucideAngularModule, LucideEye, LucideEyeOff, LucideLoaderCircle, User} from 'lucide-angular';
import {ScrollService} from '../../../core/services/scroll.service';
import {RouterLink} from '@angular/router';
import {AccountService} from '../../../core/services/account.service';
import {UserDto} from 'colibrihub-shared-dtos';
import {HotToastService} from '@ngxpert/hot-toast';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    Footer,
    FormsModule,
    LucideAngularModule,
    ReactiveFormsModule,
    Footer,
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
    private changeDetectorRef: ChangeDetectorRef,
    private toast: HotToastService
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {}

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
      return 'La contraseña debe de tener al menos 6 caracteres';
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

      const userDto: UserDto = {
        id: 0,
        username: this.signUpForm.get('userName')?.value,
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        email: this.signUpForm.get('email')?.value,
      }

      this.accountService.register(userDto).subscribe(
        {
          next: (res) => {
            console.log(res);
            this.toast.success('El usuario ha sido creado éxitosamente');
          },
          error: err => {
            console.error(err);
            this.toast.error('¡Algo ha fallado! No se pudo crear el usuario');
          }
        }
      )

      this.isLoading.set(false);
    } else {
      // Mark all fields as touched to trigger validation
      this.signUpForm.markAllAsTouched();
    }
  }
}
