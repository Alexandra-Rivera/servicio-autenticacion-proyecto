import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageDto, UserDto} from 'colibrihub-shared-dtos';
import {Observable} from 'rxjs';
import {ConfirmAccountDto} from '../../models/confirm-account-dto';
import {EmailDto} from '../../models/email-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private server_url = environment.SERVER_URL;
  constructor(private http: HttpClient) {
  }

  /** Registrar un nuevo usuario **/
  register(userDto: UserDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/users/register`, userDto);
  }

  /** Guardar datos de usuario permanentemente en la base de datos **/
  saveUser(confirmAccountDto: ConfirmAccountDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/users/persist`, confirmAccountDto);
  }

  /** Solicitar código de verificación que será enviado al email del usuario **/
  sendVerificationCode(emailDto: EmailDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/users/verificationCode`, emailDto);
  }
}
