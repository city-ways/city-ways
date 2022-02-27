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
    return await Geolocation.getCurrentPosition().catch(() => {
      return {
        coords: { latitude: 42.81006115825982, longitude: -1.6504702037831822 },
      };
    });
  }
}
