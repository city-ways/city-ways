import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingFormPage } from './parking-form.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingFormPageRoutingModule {}
