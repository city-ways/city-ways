import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingListModalComponent } from '../../shared/parking-list-modal/parking-list-modal.component';
import { ParkingService } from '../../core/parking.service';
import { ParkingDataService } from '../../core/parking-data.service';
import { UserIdService } from '../../core/user-id.service';
import { Parking } from '../../shared/parking';
import { ModalController } from '@ionic/angular';
import { EditParkingPage } from 'src/app/pages/edit-parking/edit-parking.page';
import { PageModalComponent } from 'src/app/shared/page-modal/page-modal.component';
import { ParkingListInfoPage } from '../../shared/parking-list-info/parking-list-info.page';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  @ViewChild('modalList') modalList: ParkingListModalComponent;
  @ViewChild('pageModal') pageModal: PageModalComponent;
  idUser: number;
  parkingsOfUser: Parking[];
  constructor(
    private parkingService: ParkingService,
    private idUserService: UserIdService,
    public modalController: ModalController,
    private parkingDataService: ParkingDataService
  ) {}

  ngOnInit() {
    // get the id of the user
    this.idUserService.id.subscribe((id) => {
      this.idUser = id;
    });
    //get all parkings of the user
    this.parkingService
      .getParkingOfUser(this.idUser)
      .subscribe((parkings) => (this.parkingsOfUser = parkings));

    this.parkingDataService.parking.subscribe((value) => {
      if (value != null) {
        this.showModalPage();
      }
    });
  }
  showModal() {
    if (this.parkingsOfUser.length !== 1) {
      this.showModalList();
    } else {
      this.showModalPage();
    }
  }

  async showModalPage(parking?: Parking | any) {
    const modal = await this.modalController.create({
      component: EditParkingPage,
      componentProps: {
        user: this.idUser,
        parking,
      },
    });
    return await modal.present();
  }
  async showModalList() {
    const modal = await this.modalController.create({
      component: ParkingListInfoPage,
      componentProps: {
        user: this.idUser,
      },
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('enter', data.parking);
      this.showModalPage(data.parking);
    }
  }
}
