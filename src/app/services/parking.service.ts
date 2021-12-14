import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parking } from '../shared/parking';
import { map, mapTo, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private http: HttpClient) {}

  public getParkings(): Observable<Parking[]> {
    return this.executeQueryGet<Parking[]>('parkings');
  }
  public getMaxParkingId(): Observable<number> {
    return this.executeQueryGet<Parking[]>('parkings').pipe(
      map((data) =>
        Math.max.apply(
          Math,
          data.map((parkingObj) => parkingObj.id)
        )
      )
    );
  }

  private executeQueryGet<T>(endpoint: string, query?: string): Observable<T> {
    // todo: intentar refacotizar la query
    return this.http.get<T>(
      `${environment.apiUrlBase}/${endpoint}${(query ??= '')}`
    );
  }
}
