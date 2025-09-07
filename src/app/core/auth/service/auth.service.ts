import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }

  /*Loguear un usuario */
  login(credentials: {domain: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/authentication/login`, credentials, { withCredentials: true }).pipe(
      map((response: any) => {
        console.log('Login response:', response);
      }
    ),
    catchError(this.handleError));
  }

    private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error("Credenciales no validas.");
      return throwError(() => new Error("Contraseña o nombre de usuario inválido. Intente de nuevo."));
    } else if (error.error instanceof ErrorEvent) {
      console.error("Ocurrio un error:", error.error.message);
      return throwError(() => new Error("Error de red, intentalo de nuevo."));
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      return throwError(() => new Error("Ocurrio un error, intentalo de nuevo."));
    }
  }
  
  /*Desloguear un usuario */
  logout(): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/authentication/logout`, {});
  }
}
