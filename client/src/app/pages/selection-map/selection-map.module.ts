import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectionMapPageRoutingModule } from './selection-map-routing.module';

import { SelectionMapPage } from './selection-map.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectionMapPageRoutingModule,
    IonicModule,
  ],
  declarations: [SelectionMapPage],
})
export class SelectionMapPageModule {}
