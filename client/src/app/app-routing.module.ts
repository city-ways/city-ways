import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './pages/login/login.module';
import { AuthGuard } from './core/auth.guard';
import { share } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'app',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
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
  {
    path: 'register',
    loadChildren: () => import('./shared/register/register.module').then( m => m.RegisterPageModule)
  },
  { path: '**', redirectTo: '/app/mapa', pathMatch: 'full' },
  {
    path: 'parking-form',
    loadChildren: () => import('./shared/parking-form/parking-form.module').then( m => m.ParkingFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
