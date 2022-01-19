import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditParkingPageRoutingModule } from './edit-parking-routing.module';

import { EditParkingPage } from './edit-parking.page';
import { SharedModule } from '../../shared/shared.module';
import { ParkingDataComponent } from 'src/app/shared/parking-data/parking-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditParkingPageRoutingModule,
    SharedModule,
  ],
  declarations: [EditParkingPage],
})
export class EditParkingPageModule {}
