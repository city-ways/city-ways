import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingParkingPageRoutingModule } from './booking-parking-routing.module';

import { BookingParkingPage } from './booking-parking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingParkingPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BookingParkingPage],
})
export class BookingParkingPageModule {}
