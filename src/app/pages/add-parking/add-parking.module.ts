import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParkingPageRoutingModule } from './add-parking-routing.module';

import { AddParkingPage } from './add-parking.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddParkingPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [AddParkingPage],
})
export class AddParkingPageModule {}
