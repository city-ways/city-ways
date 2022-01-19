import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// @ts-ignore
import mapboxgl from 'mapbox-gl';

if (environment.production) {
  enableProdMode();
}
mapboxgl.accessToken = environment.mapboxToken;
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
