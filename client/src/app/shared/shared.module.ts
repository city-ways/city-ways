import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ParkingListInfoPageModule } from './parking-list-info/parking-list-info.module';

@NgModule({
  declarations: [ParkingDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    ParkingListInfoPageModule,
  ],
  exports: [ParkingDataComponent],
})
export class SharedModule {}
