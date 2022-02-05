import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingService } from './parking.service';
import { UserIdService } from './user-id.service';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ParkingService, UserIdService, AuthInterceptorInterceptor],
})
export class CoreModule {}
