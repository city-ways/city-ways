import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingListModalComponent } from '../../shared/parking-list-modal/parking-list-modal.component';
import { ParkingService } from '../../core/parking.service';
import { UserIdService } from '../../core/user-id.service';
import { Parking } from '../../shared/parking';
import { ModalController } from '@ionic/angular';
import { EditParkingPage } from 'src/app/pages/edit-parking/edit-parking.page';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  @ViewChild('modalList') modalList: ParkingListModalComponent;
  idUser: number;
  parkingsOfUser: Parking[];
  constructor(
    private parkingService: ParkingService,
    private idUserService: UserIdService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    // get the id of the user
    this.idUserService.id.subscribe((id) => {
      this.idUser = id;
    });
    // get all parkings of the user
    this.parkingService
      .getParkingsOfUser(this.idUser)
      .subscribe((parkings) => (this.parkingsOfUser = parkings));
  }
  showModal(parkings: Parking[]) {
    if (parkings.length === 1) {
      console.log('');
    }
    this.modalList.showModal(parkings);
  }

  async showModalInfo(id: number) {
    const modal = await this.modalController.create({
      component: EditParkingPage,
      componentProps: {},
    });
    return await modal.present();
  }
}
