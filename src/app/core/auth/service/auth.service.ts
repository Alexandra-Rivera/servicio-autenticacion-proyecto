import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }

  /*Loguear un usuario */
  login(credentials: {domain: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/authentication/login`, credentials)
  }
  
  /*Desloguear un usuario */
  logout(): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/authentication/logout`, {});
  }
}
