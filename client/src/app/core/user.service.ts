import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/User';
import { environment } from '../../environments/environment';
import { Parking } from '../shared/parking';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrlBase}/user`;
  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
