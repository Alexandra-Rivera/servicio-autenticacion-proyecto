import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageDto} from 'colibrihub-shared-dtos';
import {BehaviorSubject, Observable} from 'rxjs';
import {ConfirmAccountDto} from '../../models/confirm-account-dto';
import {EmailDto} from '../../models/email-dto';
import {RegisterUserDto} from '../../models/register-user-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //Variable que obtiene el valor de email temporalmente
  private registroEmailSource = new BehaviorSubject<string>("");

  // public registroEmail$: Observable<string | null> = this.registroEmailSource.asObservable();

  private server_url = environment.SERVER_URL;
  constructor(private http: HttpClient) {
  }

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

  /** Registrar un nuevo usuario **/
  register(registerUserDto: RegisterUserDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/register/users/register`, registerUserDto);
  }

  /** Guardar datos de usuario permanentemente en la base de datos **/
  saveUser(confirmAccountDto: ConfirmAccountDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/register/users/persist`, confirmAccountDto);
  }

  /** Solicitar código de verificación que será enviado al email del usuario **/
  sendVerificationCode(emailDto: EmailDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/register/users/verificationCode`, emailDto);
  }
}
