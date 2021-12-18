import { Component } from '@angular/core';
import { ParkingService } from './core/parking.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: './pages/home/home.module', icon: 'home' },
  ];
  constructor() {}
}
