import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingDataComponent } from '../../shared/parking-data/parking-data.component';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.page.html',
  styleUrls: ['./add-parking.page.scss'],
})
export class AddParkingPage implements OnInit {
  constructor(private parkingService: ParkingService) {}

  ngOnInit() {}

  addNewParking(e: any) {
    // todo create new Parking
    const {
      direction,
      longPeriod,
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
    } = e;

    let parking: Parking = {
      id: 0,
      direction,
      cords: null,
      status: false,
      type: longPeriod ? 'larga estancia' : 'corta estancia',
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
      user: null,
      ranking: 0,
    };
    this.parkingService
      .getMaxParkingId()
      .subscribe((id) => (parking.id = ++id));
    this.parkingService
      .createParking(parking)
      .subscribe(() => console.log('fd'));
    this.parkingService
      .getParkingById(parking.id)
      .subscribe((data) => console.log(data));
    // console.log(e);
  }
}
