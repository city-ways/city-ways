import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  public useLocation?: [number, number];
  constructor() {
    this.getUserLocation();
  }
  public async getUserLocation() {
    return await Geolocation.getCurrentPosition();
  }
}
