import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { ParkingListComponent } from '../../components/parking-list/parking-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage, QuickActionsComponent, ParkingListComponent],
})
export class DashboardPageModule {}
