import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValueService {
  //Variable que obtiene el valor de email temporalmente
  private registroEmailSource = new BehaviorSubject<string>("");

  // public registroEmail$: Observable<string | null> = this.registroEmailSource.asObservable();

  //Metodo que actualiza el correo almacenado temporalmente
  setEmail(email: string) {
    this.registroEmailSource.next(email);
  }

  getCurrentEmail(): string {
    return this.registroEmailSource.getValue();
  }

  clearEmail(): void {
    this.registroEmailSource.next("");
  }
}
