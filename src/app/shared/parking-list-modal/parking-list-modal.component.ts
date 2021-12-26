import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParkingListInfoPage } from '../parking-list-info/parking-list-info.page';
import { ParkingService } from '../../core/parking.service';
import { UserIdService } from '../../core/user-id.service';
import { Parking } from '../parking';

@Component({
  selector: 'app-parking-list-modal',
  templateUrl: './parking-list-modal.component.html',
  styleUrls: ['./parking-list-modal.component.scss'],
})
export class ParkingListModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ParkingListInfoPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
  }
}
