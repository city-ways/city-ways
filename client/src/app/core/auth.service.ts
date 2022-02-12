import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/User';
import { environment } from '../../environments/environment';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  admin = this.adminSource.asObservable();
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

  public setRole(role: string) {
    this.adminSource.next(role !== 'ROLE_USER');
  }
}
