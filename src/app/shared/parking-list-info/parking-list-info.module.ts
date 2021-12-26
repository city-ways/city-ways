import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingListInfoPageRoutingModule } from './parking-list-info-routing.module';

import { ParkingListInfoPage } from './parking-list-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingListInfoPageRoutingModule
  ],
  declarations: [ParkingListInfoPage]
})
export class ParkingListInfoPageModule {}
