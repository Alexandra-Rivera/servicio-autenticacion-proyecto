import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
    imports: [
        NgOptimizedImage,
        RouterLink
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
}
