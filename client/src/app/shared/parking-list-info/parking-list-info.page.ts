import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parking } from '../parking';
import { ParkingDataService } from '../../core/parking-data.service';
import { ParkingService } from '../../core/parking.service';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-parking-list-info',
  templateUrl: './parking-list-info.page.html',
  styleUrls: ['./parking-list-info.page.scss'],
})
export class ParkingListInfoPage implements OnInit {
  @Input() user: number;
  public parkingList: Parking[];
  constructor(
    private modalController: ModalController,
    private parkingDataService: ParkingDataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .getUser(this.user)
      .subscribe((parkingsList) => (this.parkingList = parkingsList.owns));
  }

  guardarParking(index: number) {
    this.parkingDataService.updateParking(this.parkingList[index]);
  }
  clickParking(index: number) {
    console.log('diss', this.parkingList[index]);
    this.modalController.dismiss({ parking: this.parkingList[index] });
  }
}
