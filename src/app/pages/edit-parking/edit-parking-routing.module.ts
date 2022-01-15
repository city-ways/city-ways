import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditParkingPage } from './edit-parking.page';

const routes: Routes = [
  {
    path: '',
    component: EditParkingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditParkingPageRoutingModule {}
