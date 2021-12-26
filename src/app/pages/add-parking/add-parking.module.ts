import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParkingPageRoutingModule } from './add-parking-routing.module';

import { AddParkingPage } from './add-parking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddParkingPageRoutingModule
  ],
  declarations: [AddParkingPage]
})
export class AddParkingPageModule {}
