import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingFormPageRoutingModule } from './parking-form-routing.module';

import { ParkingFormPage } from './parking-form.page';
import { SelectionMapPageModule } from '../../pages/selection-map/selection-map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingFormPageRoutingModule,
    ReactiveFormsModule,
    SelectionMapPageModule,
  ],
  declarations: [ParkingFormPage],
})
export class ParkingFormPageModule {}
