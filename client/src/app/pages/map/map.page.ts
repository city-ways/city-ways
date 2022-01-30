import { Component, OnInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { ParkingService } from '../../core/parking.service';

import { ModalController, ViewWillEnter } from '@ionic/angular';
import { BookingParkingPage } from '../booking-parking/booking-parking.page';
import { MapService } from '../../core/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map!: Map;
  private locationUser: [number, number];
  constructor(
    private parkingService: ParkingService,
    private modalController: ModalController,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.map = new Map({
      container: 'map', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw',
      attributionControl: false,
      zoom: 17,
    });
    this.mapService.getUserLocation().then((data) => {
      const {
        coords: { latitude, longitude },
      } = data;
      this.map.setCenter([longitude, latitude]);

      new Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    });

    this.map.on('load', () => {
      this.map.resize();
    });
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
    console.log(this.locationUser);
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
