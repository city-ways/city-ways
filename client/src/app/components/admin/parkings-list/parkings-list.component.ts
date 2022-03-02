import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  deleteParking(id: number) {
    this.parkingService.deleteParking(id).subscribe(
      (value) => {
        this.presentToast('se ha eliminado el parking');
      },
      (error) => this.presentToast('No se puede eliminar un parking en uso')
    );
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
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      color: 'tertiary',
      message: text,
      duration: 2000,
    });
    toast.present();
  }
}
