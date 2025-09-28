import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageDto} from 'colibrihub-shared-dtos';
import {UpdatePasswordDto} from '../../models/update-password-dto';
import {EmailDto} from '../../models/email-dto';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private server_url: string = environment.SERVER_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  /** Solicitar codigo de recuperación **/
  passwordRecovery(emailDto: EmailDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/forgot/code/send`, emailDto);
  }

  /** Actualizar contraseña de la cuenta **/
  passwordUpdate(updatePasswordDto: UpdatePasswordDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.server_url}/forgot/code/update`, updatePasswordDto);
  }
}
