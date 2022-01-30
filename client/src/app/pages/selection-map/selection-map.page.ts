import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Map, Marker } from 'mapbox-gl';
import { MapService } from '../../core/map.service';

@Component({
  selector: 'app-selection-map',
  templateUrl: './selection-map.page.html',
  styleUrls: ['./selection-map.page.scss'],
})
export class SelectionMapPage implements OnInit {
  @Output() cords: EventEmitter<[lng: number, lat: number]> = new EventEmitter<
    [lng: number, lat: number]
  >();
  private map!: Map;
  private marker: Marker;
  constructor(
    private modalContreller: ModalController,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.map = new Map({
      container: 'selectMap', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw',
      attributionControl: false,
      zoom: 17,
    });
    this.marker = new Marker({
      draggable: true,
      color: '#3880ff',
    });
    this.mapService.getUserLocation().then((data) => {
      const {
        coords: { latitude, longitude },
      } = data;
      this.map.setCenter([longitude, latitude]);
      this.marker.setLngLat([longitude, latitude]).addTo(this.map);
    });
    this.map.on('load', () => {
      this.map.resize();
    });

    this.marker.on('dragend', () => {
      console.log(this.marker.getLngLat());
    });
  }
  exit() {
    const { lng, lat } = this.marker.getLngLat();
    this.cords.emit([lng, lat]);
    this.modalContreller.dismiss([lng, lat]);
  }
}
