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


  /*Login de usuario*/
  login(login_info: Login): Observable<any> {
    return this.http.post(`${this.server_url}/auth/login`, login_info).pipe(
      tap((response: any) => {
        if (response && response.token) {
            this.setToken(response.token);
            this._isAuthenticated.next(true);
            this.router.navigate(['/home']);
        }
      })
    );
  }
}
