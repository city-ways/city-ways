import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddParkingPage } from './add-parking.page';

const routes: Routes = [
  {
    path: '',
    component: AddParkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddParkingPageRoutingModule {}
