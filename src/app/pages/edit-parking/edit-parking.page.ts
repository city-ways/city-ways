import { Component, Input, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.page.html',
  styleUrls: ['./edit-parking.page.scss'],
})
export class EditParkingPage implements OnInit {
  @Input() user: number;
  @Input() parking: Parking;
  public parkingApi: Parking;
  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    if (!this.parking) {
      this.parkingService
        .getParkingOfUser(this.user)
        .subscribe((parkingsList) => (this.parkingApi = parkingsList[0]));
    } else {
      this.parkingApi = this.parking;
      console.log(' enter1', this.parkingApi);
    }
  }
}
