import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookParkingPageRoutingModule } from './book-parking-routing.module';

import { BookParkingPage } from './book-parking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookParkingPageRoutingModule
  ],
  declarations: [BookParkingPage]
})
export class BookParkingPageModule {}
