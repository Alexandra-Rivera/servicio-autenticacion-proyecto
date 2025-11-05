import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {LucideAngularModule, LucideHandCoins} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  readonly handCoins = LucideHandCoins;
  year: number;
  currentYear: number = new Date().getFullYear();

  constructor() {
    this.year = new Date().getFullYear();
  }

  title = "Colibrihub Systems";
}
