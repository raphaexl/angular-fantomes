import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  private localIdKey = 'userId';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe((newUser) => {
      localStorage.setItem(this.tokenKey, newUser.token);
      localStorage.setItem(this.localIdKey, newUser._id);
      this.router.navigate(['/']);
    });
  }

  public register(username: string, email: string, password: string): void {
    this.authenticationClient
      .register(username, email, password)
      .subscribe((newUser) => {
        localStorage.setItem(this.tokenKey, newUser.token);
        localStorage.setItem(this.localIdKey, newUser._id);
        this.router.navigate(['/']);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.localIdKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public getLocalID(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.localIdKey) : null;
  }
}