import { Component, OnInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { ParkingService } from '../../core/parking.service';

import { ModalController } from '@ionic/angular';
import { BookingParkingPage } from '../booking-parking/booking-parking.page';
import { MapService } from '../../core/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map!: Map;

  constructor(
    private parkingService: ParkingService,
    private modalController: ModalController,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.parkingService.getParkings().subscribe((data) => {
      data.map(({ cords: { longitude, latitude }, id }) => {
        // Add a marker for each car park and its corresponding event to show the booking mode
        const popup = new Popup();
        popup.on('open', () => {
          this.showModal(id);
        });
        console.log([[longitude, latitude]]);
        new Marker({ color: '#3880ff' })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map);
      });
    });
    this.map = new Map({
      container: 'map', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw',
      attributionControl: false,
      center: [-1.685128, 42.781851],
      zoom: 17,
    });
    this.map.on('load', () => {
      this.map.resize();
    });
  }
  async showModal(id: number) {
    const modal = await this.modalController.create({
      component: BookingParkingPage,
      initialBreakpoint: 0.25,
      componentProps: {
        id,
      },
      breakpoints: [0.25, 0.5, 1],
    });
    return await modal.present();
  }
}
