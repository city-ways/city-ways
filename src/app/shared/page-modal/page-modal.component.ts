import { Component, OnInit } from '@angular/core';
import { Parking } from '../parking';
import { ModalController } from '@ionic/angular';
import { EditParkingPage } from 'src/app/pages/edit-parking/edit-parking.page';
@Component({
  selector: 'app-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.scss'],
})
export class PageModalComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async showModal(parking: Parking) {
    const modal = await this.modalController.create({
      component: EditParkingPage,
      componentProps: { parking },
    });
    return await modal.present();
  }
}
