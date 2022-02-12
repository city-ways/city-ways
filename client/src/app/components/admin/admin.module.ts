import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingsListComponent } from './parkings-list/parkings-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ParkingsListComponent, UsersListComponent],
  imports: [CommonModule, IonicModule],
  exports: [ParkingsListComponent, UsersListComponent],
})
export class AdminModule {}
