import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parking } from '../shared/parking';
import { map, mapTo, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// todo: Refactor
export class ParkingService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private url = `${environment.apiUrlBase}/parkings`;
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
    return this.executeQueryPost<Parking>('parkings', parking);
  }
  public deleteParking(id: number): Observable<any> {
    return this.executeQueryDelete<any>('/parkings', id);
  }
  public updateParking(product: Parking): Observable<Parking> {
    return this.http.put<Parking>(`${this.url}/${product.id}`, product, {
      headers: this.headers,
    });
  }

  private executeQueryGet<T>(endpoint: string, query?: string): Observable<T> {
    // todo: intentar refacotizar la query
    return this.http.get<T>(
      `${environment.apiUrlBase}/${endpoint}${(query ??= '')}`
    );
  }
  private executeQueryPost<T>(
    endpoint: string,
    newObj: Parking
  ): Observable<T> {
    return this.http.post<T>(`${environment.apiUrlBase}`, newObj, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
  private executeQueryDelete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrlBase}/${id}`, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
