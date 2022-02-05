import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingService } from './parking.service';
import { UserService } from './user.service';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ParkingService,
    UserService,
    AuthInterceptorInterceptor,
    AuthGuard,
  ],
})
export class CoreModule {}
