import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingParkingPage } from './booking-parking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingParkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingParkingPageRoutingModule {}
