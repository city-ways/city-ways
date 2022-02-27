import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
/*
Para no agregar una libreria para implementar el patron Redux (NgRx) usamos BehaviorSubject de rxjs
 */
export class UserService {
  private url = `${environment.apiUrlBase}/api/user`;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private hasBookAParkingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  hasBooking = this.hasBookAParkingSource.asObservable();
  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}`);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrlBase}/api/users`);
  }

  public updateUser(user: User) {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }
  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
