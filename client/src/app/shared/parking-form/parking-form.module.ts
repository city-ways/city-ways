import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingFormPageRoutingModule } from './parking-form-routing.module';

import { ParkingFormPage } from './parking-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ParkingFormPage],
})
export class ParkingFormPageModule {}
