import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import {SessionService} from 'colibrihub-shared-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('servicio-autenticacion-proyecto');

  constructor() {
    inject(SessionService);
  }
}
