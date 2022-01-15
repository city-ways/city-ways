import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParkingListInfoPage } from '../parking-list-info/parking-list-info.page';
import { Parking } from '../parking';

@Component({
  selector: 'app-parking-list-modal',
  templateUrl: './parking-list-modal.component.html',
  styleUrls: ['./parking-list-modal.component.scss'],
})
export class ParkingListModalComponent implements OnInit {
  @Input() actionType: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async showModal(parkings: Parking[]) {
    const modal = await this.modalCtrl.create({
      component: ParkingListInfoPage,
      componentProps: {
        parkingList: parkings,
      },
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
  }
}
