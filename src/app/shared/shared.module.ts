import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingListModalComponent } from './parking-list-modal/parking-list-modal.component';

@NgModule({
  declarations: [ParkingDataComponent, ParkingListModalComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [ParkingDataComponent, ParkingListModalComponent],
})
export class SharedModule {}
