import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingService } from './parking.service';
import { HttpClientModule } from '@angular/common/http';
import { UserIdService } from './user-id.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ParkingService, UserIdService],
})
export class CoreModule {}
