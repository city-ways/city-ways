import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { SharedModule } from '../../shared/shared.module';
import { UserActionsComponent } from '../../components/user-actions/user-actions.component';
import { AdminModule } from '../../components/admin/admin.module';
import { HistoryComponent } from '../../components/history/history.component';
import { ParkingFormPageModule } from '../../shared/parking-form/parking-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    AdminModule,
    ParkingFormPageModule,
  ],
  declarations: [
    DashboardPage,
    QuickActionsComponent,
    UserActionsComponent,
    HistoryComponent,
  ],
})
export class DashboardPageModule {}
