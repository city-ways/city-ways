import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parking } from '../shared/parking';
import { catchError, map, mapTo, reduce, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private url = `${environment.apiUrlBase}/api/parkings`;

  constructor(private http: HttpClient) {}

  private static handleError(err: any) {
    //just logging it to the console
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

  public getParkings(): Observable<Parking[]> {
    return this.http
      .get<Parking[]>(this.url)
      .pipe(catchError(ParkingService.handleError));
  }

  public getFreeParkings(): Observable<Parking[]> {
    const param = new HttpParams().append('status ', false);
    return this.http
      .get<Parking[]>(this.url, { params: param })
      .pipe(catchError(ParkingService.handleError));
  }

  public getMaxParkingId(): Observable<number> {
    return this.http.get<Parking[]>(this.url).pipe(
      map((data) =>
        Math.max.apply(
          Math,
          data.map((parkingObj) => parkingObj.id)
        )
      ),
      catchError(ParkingService.handleError)
    );
  }

  public getParkingById(id: number): Observable<Parking> {
    return this.http
      .get<Parking>(`${this.url}/${id}`)
      .pipe(catchError(ParkingService.handleError));
  }

  public createParking(parking: Parking): Observable<Parking> {
    return this.http
      .post<Parking>(this.url, parking, {
        headers: this.headers,
      })
      .pipe(catchError(ParkingService.handleError));
  }

  public deleteParking(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(ParkingService.handleError));
  }

  public updateParking(parking: Parking) {
    return this.http
      .put<Parking>(`${this.url}/${parking.id}`, parking, {
        headers: this.headers,
      })
      .pipe(catchError(ParkingService.handleError));
  }
  // todo refactor id
  public getParkingOfUser(idUser: number): Observable<Parking[]> {
    const param = new HttpParams().append('user.id', idUser);
    return this.http.get<Parking[]>(this.url, { params: param });
  }
}
