import { Component } from '@angular/core';
import {LucideAngularModule, LucideCircleCheckBig, LucideMoveRight} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-successful-message',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './auth-successful-message.html',
  styleUrl: './auth-successful-message.css'
})
export class AuthSuccessfulMessage {
  readonly circleCheckBig = LucideCircleCheckBig;
  readonly moveRight = LucideMoveRight;
}
