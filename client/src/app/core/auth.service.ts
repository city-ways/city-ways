import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/User';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.apiUrlBase;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public register(username: string, password: string) {
    return this.http.post<User>(
      `${this.url}/register`,
      { username, password },
      { headers: this.headers }
    );
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
}
