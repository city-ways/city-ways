import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Parking } from '../shared/parking';

@Injectable()
/*
Para no agregar una libreria para implementar el patron Redux (NgRx) usamos BehaviorSubject de rxjs
 */
export class UserService {
  private url = `${environment.apiUrlBase}/api/user`;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private idSource: ReplaySubject<User> = new ReplaySubject<User>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  user = this.idSource.asObservable();
  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}`);
  }

  public updateUser(mail: string) {
    const param = new HttpParams().append('mail', mail);
    console.log(mail);
    this.http
      .get<User>(this.url, { params: param })
      .subscribe((data) => this.idSource.next(data));
  }

  public register(user: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrlBase}/register`, user, {
      headers: this.headers,
    });
  }
}
