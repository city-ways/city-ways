import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
