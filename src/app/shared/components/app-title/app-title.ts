import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-title',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './app-title.html',
  styleUrl: './app-title.css'
})
export class AppTitle {
  appTitle: string = "Colibrihub Systems";
}
