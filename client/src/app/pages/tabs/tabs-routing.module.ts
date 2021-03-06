import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ActiveGuardGuard } from '../../core/active-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'panel',
        canActivate: [ActiveGuardGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(
                (m) => m.DashboardPageModule
              ),
          },
        ],
      },
      {
        path: 'mapa',
        canActivate: [ActiveGuardGuard],
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
