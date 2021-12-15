import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public getParkingById(id: number): Observable<Parking> {
    return this.executeQueryGet<Parking>('parkings', `/${id}`);
  }
  public createParking(parking: Parking): Observable<Parking> {
    // product.id = 0;
    return this.http
      .post<Parking>(this.productsUrl, product, { headers: headers })
      .pipe();
  }

  private executeQueryGet<T>(endpoint: string, query?: string): Observable<T> {
    // todo: intentar refacotizar la query
    return this.http.get<T>(
      `${environment.apiUrlBase}/${endpoint}${(query ??= '')}`
    );
  }
  private executeQueryPost<T>(endpoint: string, newObj: string): Observable<T> {
    // todo: intentar refacotizar la query
    return this.http.post<T>(`${environment.apiUrlBase}`, newObj, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
