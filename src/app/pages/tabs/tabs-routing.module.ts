import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'panel',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(
                (m) => m.DashboardPageModule
              ),
          },
          {
            path: 'new-parking',
            loadChildren: () =>
              import('../add-parking/add-parking.module').then(
                (m) => m.AddParkingPageModule
              ),
          },
          {
            path: 'edit/:id',
            loadChildren: () =>
              import('../edit-parking/edit-parking.module').then(
                (m) => m.EditParkingPageModule
              ),
          },
        ],
      },
      {
        path: 'mapa',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../map/map.module').then((m) => m.MapPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
