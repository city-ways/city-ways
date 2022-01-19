import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { SharedModule } from '../../shared/shared.module';
import { UserActionsComponent } from '../../components/user-actions/user-actions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardPage, QuickActionsComponent, UserActionsComponent],
})
export class DashboardPageModule {}
