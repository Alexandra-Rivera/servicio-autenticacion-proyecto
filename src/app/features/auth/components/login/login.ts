import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff, LogIn } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //Variables de url
  private returnUrl: string = "";

  //icons
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  // Declaramos la variable del formulario
  signInForm: FormGroup;

  // Variable para mostrar/ocultar la contraseña
  showPassword = false;

  // Variable para manejar las alertas
  alert = {
    isVisible: false,
    type: '',
    message: '',
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {
    // Initialize the form with pre-filled values
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
  });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['to'] || "/";
    });
  }

  // Método para manejar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    const username = this.signInForm.get('username')?.value.trim();
    const password = this.signInForm.get('password')?.value;

    if (this.signInForm.valid) {
      const credentials: any = {
        domain: '',
        username: username || '',
        password: password || ''
      }

      this.authService.login(credentials).pipe().subscribe({
        next: (response) => {        
          // Successful login
          this.alert.isVisible = true;
          this.alert.type = 'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-green-100 text-green-500';
          this.alert.message = 'Login successful! Redirecting...';

          // Deteccion de cambios manual
          this.changeDetectorRef.detectChanges();

          //Redireccion
          window.location.href = `${this.returnUrl}`; // Redirigir a la URL almacenada
        },
        error: (error) => {
          // Show an error alert
          this.alert.isVisible = true;
          this.alert.type =
          'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
          this.alert.message = 'Contraseña o nombre de usuario inválido. Intente de nuevo.';

          // Deteccion de cambios manual
          this.changeDetectorRef.detectChanges();
        }
      });
    } else {
        // Show an error alert if form is not valid
        this.alert.isVisible = true;
        this.alert.type =
        'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
        this.alert.message = 'Debe colocar su nombre y contraseña para ingresar.';

    }
  }
}