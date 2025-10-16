import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Eye,
  EyeOff,
  User,
  LucideLoaderCircle,
  LucideMoveRight,
  LucideUsers
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { LoginDto } from 'colibrihub-shared-dtos';
import { AuthService } from 'colibrihub-shared-services';
import { SeoService } from '../../../core/services/seo.service';
import {DomainResolverService} from '../../../core/services/domain-resolver.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  //icons
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly user = User;
  readonly loaderCircle = LucideLoaderCircle;
  readonly moveRight = LucideMoveRight;
  readonly users = LucideUsers;

  // Declaramos la variable del formulario
  protected signInForm: FormGroup;

  showPassword = false;
  isLoading = signal(false);

  // Variable para manejar las alertas
  alert = {
    isVisible: false,
    type: '',
    message: '',
  };

  ngOnInit(): void {
    this.seoService.setAll({
      title: 'Inicio de sesión',
      description: 'Accede a tu  cuenta para continuar',
    });
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seoService: SeoService,
    private readonly domainResolver: DomainResolverService
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Método para manejar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  protected onSubmit() {
    const username = this.signInForm.get('username')?.value.trim();
    const password = this.signInForm.get('password')?.value;

    if (this.signInForm.valid) {
      if (this.isLoading()) return;

      this.isLoading.set(true);

      const domainOnly = this.domainResolver.resolveDomain();

      const credentials: LoginDto = {
        domain: domainOnly,
        username: username || '',
        password: password || '',
      };

      this.authService
        .login(credentials)
        .pipe()
        .subscribe({
          next: () => {
            // Successful login
            this.alert.isVisible = true;
            this.alert.type =
              'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-green-100 text-green-500';
            this.alert.message = 'Login successful! Redirecting...';
            this.isLoading.set(false);

            setTimeout(() => {
              const target = this.domainResolver.buildRedirectUrl()
              if (target) {
                window.location.href = target;
              } else {
                window.location.href = '/';
              }
            }, 300);
          },
          error: () => {
            this.isLoading.set(false);
            this.alert.isVisible = true;
            this.alert.type =
              'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
            this.alert.message = 'Ocurrió un error al iniciar sesión.';
          },
        });
    }
  }
}
