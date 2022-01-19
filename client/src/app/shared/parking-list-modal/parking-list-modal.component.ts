import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParkingListInfoPage } from '../parking-list-info/parking-list-info.page';
import { Parking } from '../parking';
import { ParkingService } from '../../core/parking.service';

@Component({
  selector: 'app-parking-list-modal',
  templateUrl: './parking-list-modal.component.html',
  styleUrls: ['./parking-list-modal.component.scss'],
})
export class ParkingListModalComponent implements OnInit {
  @Input() user: number;
  private parkings;
  constructor(
    private modalCtrl: ModalController,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.parkingService
      .getParkingOfUser(this.user)
      .subscribe((parkingsList) => (this.parkings = parkingsList));
  }
}
