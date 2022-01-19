import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingDataComponent } from '../../shared/parking-data/parking-data.component';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.page.html',
  styleUrls: ['./add-parking.page.scss'],
})
export class AddParkingPage implements OnInit {
  constructor(private modalContrller: ModalController) {}

  ngOnInit() {}
  exit() {
    this.modalContrller.dismiss();
  }
}
