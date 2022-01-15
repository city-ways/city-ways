import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Parking } from '../shared/parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingDataService {
  private parkingSource: BehaviorSubject<Parking> =
    new BehaviorSubject<Parking>(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  parking = this.parkingSource.asObservable();
  constructor() {}

  updateParking(parking: Parking) {
    this.parkingSource.next(parking);
  }
}
