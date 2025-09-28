import { Component } from '@angular/core';
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
import {LucideAngularModule, LucideEye, LucideEyeOff, User} from 'lucide-angular';
import {ScrollService} from '../../../core/services/scroll.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    Footer,
    FormsModule,
    LucideAngularModule,
    ReactiveFormsModule,
    Footer,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  //icons
  readonly eye = LucideEye;
  readonly eyeOff = LucideEyeOff;
  readonly user = User;

  signUpForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private scrollService: ScrollService
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
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
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
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
      // Handle form submission logic here
      // console.log('Form Submitted', this.signUpForm.value);
      window.alert(`It works!, ${this.signUpForm.value}`);
    } else {
      // Mark all fields as touched to trigger validation
      this.signUpForm.markAllAsTouched();
    }
  }
}
