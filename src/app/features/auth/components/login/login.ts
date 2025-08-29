import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
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

  // Predefined credentials
  private predefinedEmail = 'admin@SRBThemes.com';
  private predefinedPassword = 'admin@123';

  // Inyectamos FormBuilder y Router en el constructor
  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with pre-filled values
    this.signInForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required],
  });
  }

  // Método para manejar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    const emailOrUsername = this.signInForm.get('emailOrUsername')?.value;
    const password = this.signInForm.get('password')?.value;

    if (this.signInForm.valid) {
        // Successful login
        this.alert.isVisible = true;
        this.alert.type =
          'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-green-100 text-green-500';
        this.alert.message = 'Login successful! Redirecting...';


        /*Si la respuesta que viene de la api es success entonces se va a redireccionar la pagina hacia la cuenta de usuario 
          Sino, entonces se muestra un mensaje de error
        */

        if (emailOrUsername === this.predefinedEmail && password === this.predefinedPassword) {
        // Redirect to another page after a short delay
        setTimeout(() => {
          this.router.navigate(['/']); // Change this to the desired route
        }, 1000);

      } else {
        // Show an error alert
        this.alert.isVisible = true;
        this.alert.type =
          'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
        this.alert.message = 'Contraseña o nombre de usuario inválido. Intente de nuevo.';
      }
    } else {
      // Show an error alert if form is not valid
      this.alert.isVisible = true;
      this.alert.type =
        'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
      this.alert.message = 'Debe colocar su nombre y contraseña para ingresar.';
    }
  }
}
