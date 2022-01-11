import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookParkingPageRoutingModule } from './book-parking-routing.module';

import { BookParkingPage } from './book-parking.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookParkingPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [BookParkingPage],
})
export class BookParkingPageModule {}
