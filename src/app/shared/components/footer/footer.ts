import { Component } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {AppTitle} from '../app-title/app-title';

@Component({
  selector: 'app-footer',
  imports: [
    LucideAngularModule,
    AppTitle
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  year: number;
  currentYear: number = new Date().getFullYear();

  constructor() {
    this.year = new Date().getFullYear();
  }

  title = "Colibrihub Systems";
}
