import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingListModalComponent } from './parking-list-modal/parking-list-modal.component';
import { RouterModule } from '@angular/router';
import { ParkingListInfoPageModule } from './parking-list-info/parking-list-info.module';
import { PageModalComponent } from './page-modal/page-modal.component';

@NgModule({
  declarations: [
    ParkingDataComponent,
    ParkingListModalComponent,
    PageModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    ParkingListInfoPageModule,
  ],
  exports: [
    ParkingDataComponent,
    ParkingListModalComponent,
    PageModalComponent,
  ],
})
export class SharedModule {}
