import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-title',
  imports: [
    RouterLink
  ],
  templateUrl: './app-title.html',
  styleUrl: './app-title.css'
})
export class AppTitle {
  appTitle: string = "Colibrihub Systems";
}
