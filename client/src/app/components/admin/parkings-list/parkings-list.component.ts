import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../../shared/User';
import { UserService } from '../../../core/user.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../../../shared/user-form/register.page';
import { Parking } from '../../../shared/parking';
import { ParkingService } from '../../../core/parking.service';
import { ParkingFormPage } from '../../../shared/parking-form/parking-form.page';

@Component({
  selector: 'app-parkings-list',
  templateUrl: './parkings-list.component.html',
  styleUrls: ['./parkings-list.component.scss'],
})
export class ParkingsListComponent implements OnInit, OnChanges {
  @Input() reloadTrigger: boolean;
  public parkings: Parking[];
  constructor(
    private parkingService: ParkingService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  deleteParking(id: number) {
    this.parkingService.deleteParking(id).subscribe();
  }
  async showModalPage(parking?: Parking) {
    const modal = await this.modalController.create({
      component: ParkingFormPage,
      componentProps: {
        type: 'editar',
        data: parking,
      },
    });
    return await modal.present();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parkingService
      .getParkings()
      .subscribe((parkings) => (this.parkings = parkings));
  }
}
