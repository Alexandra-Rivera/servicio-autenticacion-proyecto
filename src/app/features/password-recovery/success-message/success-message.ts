import { Component } from '@angular/core';
import {LucideAngularModule, LucideCircleCheckBig, LucideMoveRight} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-success-message',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './success-message.html',
  styleUrl: './success-message.css'
})
export class SuccessMessage {
  readonly circleCheckBig = LucideCircleCheckBig;
  readonly moveRight = LucideMoveRight;
}
