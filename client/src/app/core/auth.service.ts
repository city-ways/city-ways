import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/User';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();

  private adminSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    undefined
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  admin = this.adminSource.asObservable();
  private url: string = environment.apiUrlBase;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  public register(user: User) {
    return this.http.post<User>(`${this.url}/register`, user, {
      headers: this.headers,
    });
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
    location.reload();
  }

  public setRole(role: string) {
    console.log('rolee', role);
    this.adminSource.next(role !== 'ROLE_USER');
  }

  public decodeToken() {
    const token = this.helper.decodeToken(localStorage.getItem('auth_token'));
    this.setRole(token.roles[0]);
  }
}
