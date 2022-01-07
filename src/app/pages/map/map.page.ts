import { Component, OnInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { ParkingService } from '../../core/parking.service';

import { ModalController } from '@ionic/angular';

import { BookParkingPage } from '../book-parking/book-parking.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map!: Map;
  constructor(
    private parkingService: ParkingService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.parkingService.getParkings().subscribe((data) => {
      data.map(({ cords: { longitude, latitude }, id }) => {
        console.log(longitude);
        const popup = new Popup();
        popup.on('open', () => {
          this.presentModal(id);
        });
        new Marker({ color: '#3880ff' })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map);
      });
    });
    this.map = new Map({
      container: 'map', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw',
      center: [-1.685128, 42.781851],
      zoom: 17,
    });
    this.map.on('load', () => {
      this.map.resize();
    });
  }
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: BookParkingPage,
      initialBreakpoint: 0.5,
      componentProps: {
        id,
      },
      breakpoints: [0, 0.5, 1],
    });
    return await modal.present();
  }
}
