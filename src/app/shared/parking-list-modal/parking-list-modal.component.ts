import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParkingListInfoPage } from '../parking-list-info/parking-list-info.page';

@Component({
  selector: 'app-parking-list-modal',
  templateUrl: './parking-list-modal.component.html',
  styleUrls: ['./parking-list-modal.component.scss'],
})
export class ParkingListModalComponent implements OnInit {
  @Input() idUser: number;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ParkingListInfoPage,
      componentProps: {
        idUser: this.idUser,
      },
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
  }
}
