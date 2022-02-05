import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
/*
Para no agregar una libreria para implementar el patron Redux (NgRx) usamos BehaviorSubject de rxjs
 */
export class UserIdService {
  private url = `${environment.apiUrlBase}/user`;
  private idSource: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  id = this.idSource.asObservable();

  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  //todo: cambiar cuando este el sistema de usuarios
  public updateId(id: number) {
    this.idSource.next(id);
  }
}
