import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './pages/login/login.module';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  // {
  //   path: 'dashboard',
  //   canLoad: [AuthGuard],
  //   loadChildren: () =>
  //     import('./pages/dashboard/dashboard.module').then(
  //       (m) => m.DashboardPageModule
  //     ),
  // },
  // {
  //   path: 'map',
  //   canLoad: [AuthGuard],
  //   loadChildren: () =>
  //     import('./pages/map/map.module').then((m) => m.MapPageModule),
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
