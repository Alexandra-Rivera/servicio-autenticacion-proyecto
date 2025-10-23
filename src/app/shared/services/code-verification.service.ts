import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeVerificationService {
  private passwordVerificationCode  = new BehaviorSubject<string>("");

  setPasswordVerificationCode(code: string) {
    this.passwordVerificationCode.next(code);
  }

  getPasswordVerificationCode() {
    return this.passwordVerificationCode.getValue();
  }
}
