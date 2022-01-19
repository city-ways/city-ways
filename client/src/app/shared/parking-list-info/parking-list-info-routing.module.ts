import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingListInfoPage } from './parking-list-info.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingListInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingListInfoPageRoutingModule {}
