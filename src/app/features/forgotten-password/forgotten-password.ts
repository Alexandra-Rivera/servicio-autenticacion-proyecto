import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {LucideAngularModule, LucideMoveRight, LucideUser} from 'lucide-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Footer} from '../../shared/components/footer/footer';

@Component({
  selector: 'app-forgotten-password',
  imports: [RouterLink, LucideAngularModule, FormsModule, ReactiveFormsModule, Footer],

  templateUrl: './forgotten-password.html',
  styleUrl: './forgotten-password.css'
})
export class ForgottenPassword {
  readonly moveRight = LucideMoveRight;
  readonly user = LucideUser;
}
