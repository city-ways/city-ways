import { Component, OnInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { ParkingService } from '../../core/parking.service';

import { ModalController, ViewWillEnter } from '@ionic/angular';
import { BookingParkingPage } from '../booking-parking/booking-parking.page';
import { MapService } from '../../core/map.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map!: Map;
  private markers: Marker[] = [];
  private locationUser: [number, number];
  private mapDark = 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw';
  private mapLight = 'mapbox://styles/fgergfer/ckx2fkq0344le15mtc7owbizj';

  constructor(
    private parkingService: ParkingService,
    private modalController: ModalController,
    private mapService: MapService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.map = new Map({
      container: 'map', //  containerID
      style: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? this.mapDark
        : this.mapLight,
      attributionControl: false,
      zoom: 17,
    });
    // change the map style if the user change the colors when the app is running
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          this.map.setStyle(this.mapDark);
        } else {
          this.map.setStyle(this.mapLight);
        }
      });

    this.map.on('load', () => {
      this.map.resize();
    });
    this.loadMarkers();
    console.log(this.locationUser);
  }

  public loadMarkers() {
    if (this.markers.length > 0) {
      this.markers.map((marker) => marker.remove());
      this.markers = [];
    }
    this.mapService.getUserLocation().then((data) => {
      const {
        coords: { latitude, longitude },
      } = data;
      this.map.setCenter([longitude, latitude]);

      const mark = new Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .addTo(this.map);
      this.markers.push(mark);
    });
    this.parkingService.getParkings().subscribe((data) => {
      data.map(({ cords: { longitude, latitude }, id }) => {
        // Add a marker for each car park and its corresponding event to show the booking mode
        const popup = new Popup();
        popup.on('open', () => {
          this.showModal(id);
        });
        const markerParking = new Marker({ color: '#3880ff' })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map);
        this.markers.push(markerParking);
      });
    });
    console.log(this.markers);
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
