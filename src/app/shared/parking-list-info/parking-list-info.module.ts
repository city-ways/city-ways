import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingListInfoPageRoutingModule } from './parking-list-info-routing.module';

import { ParkingListInfoPage } from './parking-list-info.page';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingListInfoPageRoutingModule,
    RouterModule,
  ],
  declarations: [ParkingListInfoPage],
})
export class ParkingListInfoPageModule {}
