import { Component, Input, OnInit } from '@angular/core';
import { Parking } from '../parking';
import { ModalController } from '@ionic/angular';
import { EditParkingPage } from 'src/app/pages/edit-parking/edit-parking.page';
import { ParkingService } from '../../core/parking.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.scss'],
})
export class PageModalComponent implements OnInit {
  @Input() user: number;
  private parking: Parking;
  private isLoaded: boolean;
  constructor(
    public modalController: ModalController,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.isLoaded = false;
    console.warn('iker');
    this.parkingService
      .getParkingOfUser(this.user)
      .subscribe((parkingsList) => (this.parking = parkingsList[0]));
    this.isLoaded = true;
  }

  async showModal() {
    if (this.isLoaded) {
      console.log(this.parking);
      const modal = await this.modalController.create({
        component: EditParkingPage,
        componentProps: {
          user: this.user,
        },
      });
      return await modal.present();
    }
  }
}
