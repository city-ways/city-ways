import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectionMapPageRoutingModule } from './selection-map-routing.module';

import { SelectionMapPage } from './selection-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectionMapPageRoutingModule
  ],
  declarations: [SelectionMapPage]
})
export class SelectionMapPageModule {}
