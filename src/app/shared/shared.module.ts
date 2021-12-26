import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingListModalComponent } from './parking-list-modal/parking-list-modal.component';
import { ParkingListInfoPage } from './parking-list-info/parking-list-info.page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ParkingDataComponent,
    ParkingListModalComponent,
    ParkingListInfoPage,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
  exports: [ParkingDataComponent, ParkingListModalComponent],
})
export class SharedModule {}
