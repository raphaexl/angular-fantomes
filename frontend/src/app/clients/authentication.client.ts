import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/login',
      {
        email: email,
        password: password,
      },
      { responseType: 'json' }
    );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/register',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'json' }
    );
  }
}