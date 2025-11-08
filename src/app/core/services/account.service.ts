import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageDto} from 'colibrihub-shared-dtos';
import {ConfirmAccountDto} from '../../models/confirm-account-dto';
import {EmailDto} from '../../models/email-dto';
import {RegisterUserDto} from '../../models/register-user-dto';
import {UpdatePasswordDto} from '../../models/update-password-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private server_url = environment.SERVER_URL;
  constructor(private http: HttpClient) {
  }

  /** Registrar un nuevo usuario **/
  register(registerUserDto: RegisterUserDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/verification/users/register`, registerUserDto);
  }

  /** Guardar datos de usuario permanentemente en la base de datos **/
  saveUser(confirmAccountDto: ConfirmAccountDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/verification/users/persist`, confirmAccountDto);
  }

  /** Solicitar código de verificación que será enviado al email del usuario **/
  sendVerificationCode(emailDto: EmailDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/verification/codes/create`, emailDto);
  }

  /** Solicitar codigo de recuperación **/
  recoverPassword(emailDto: EmailDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/forgot/code/send`, emailDto);
  }

  /** Actualizar contraseña de la cuenta **/
  updatePassword(updatePasswordDto: UpdatePasswordDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/forgot/user/update`,updatePasswordDto);
  }
}
