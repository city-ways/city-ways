import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { History } from '../shared/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private url = `${environment.apiUrlBase}/api/history`;
  constructor(private http: HttpClient) {}
  public historyOfUSer(): Observable<History[]> {
    return this.http.get<History[]>(this.url);
  }
}
