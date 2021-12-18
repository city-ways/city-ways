import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ParkingDataComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [ParkingDataComponent],
})
export class SharedModule {}
