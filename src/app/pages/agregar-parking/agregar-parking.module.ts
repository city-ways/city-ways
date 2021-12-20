import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarParkingPageRoutingModule } from './agregar-parking-routing.module';

import { AgregarParkingPage } from './agregar-parking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarParkingPageRoutingModule
  ],
  declarations: [AgregarParkingPage]
})
export class AgregarParkingPageModule {}
