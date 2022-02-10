import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/User';
import { HttpClient, HttpParams } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable()
/*
Para no agregar una libreria para implementar el patron Redux (NgRx) usamos BehaviorSubject de rxjs
 */
export class UserService {
  private url = `${environment.apiUrlBase}/api/user`;
  private idSource: ReplaySubject<User> = new ReplaySubject<User>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  user = this.idSource.asObservable();
  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  public updateUser(mail: string) {
    const param = new HttpParams().append('mail', mail);
    console.log(mail);
    this.http
      .get<User>(this.url, { params: param })
      .subscribe((data) => this.idSource.next(data));
  }
}
