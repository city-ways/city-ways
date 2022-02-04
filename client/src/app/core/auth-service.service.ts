import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/User';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url: string = environment.apiUrlBase;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public register(username: string, password: string) {
    return this.http
      .post<User>(
        `${this.url}/register`,
        { username, password },
        { headers: this.headers }
      )
      .pipe(map((res) => this.setSession));
  }

  public login(username: string, password: string) {
    return this.http.post<User>(
      `${this.url}/login_check`,
      { username, password },
      { headers: this.headers }
    );
  }

  public logout() {
    localStorage.removeItem('auth_token');
  }

  public isLoggedIn() {
    return this.getExpiration();
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt);
  }

  private setSession(authResult) {
    const expiresAt = authResult.expiresIn;

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
