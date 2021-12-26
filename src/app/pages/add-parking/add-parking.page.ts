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
    console.log(daysAvailable);
    console.log(timesAvailable);
    // const parking: Parking = {
    //   id: 0,
    //   direction,
    //   type: longPeriod ? 'larga estancia' : 'corta estancia',
    // };
    // this.parkingService.getMaxParkingId().subscribe((id) => (e.id = ++id));
    // this.parkingService.createParking(e).subscribe(() => console.log('fd'));
    // this.parkingService
    //   .getParkingById(5)
    //   .subscribe((data) => console.log(data));
    // console.log(e);
  }
}
