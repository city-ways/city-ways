import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarParkingPage } from './agregar-parking.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarParkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarParkingPageRoutingModule {}
