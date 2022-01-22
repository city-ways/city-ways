import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingDataComponent } from './parking-data/parking-data.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingListModalComponent } from './parking-list-modal/parking-list-modal.component';
import { ParkingListInfoPage } from './parking-list-info/parking-list-info.page';
import { RouterModule } from '@angular/router';
import { ParkingListInfoPageModule } from './parking-list-info/parking-list-info.module';
import { PageModalComponent } from './page-modal/page-modal.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    ParkingDataComponent,
    ParkingListModalComponent,
    PageModalComponent,
    SearchResultsComponent,
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
