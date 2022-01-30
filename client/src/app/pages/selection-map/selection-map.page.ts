import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Map, Marker } from 'mapbox-gl';

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
  constructor(private modalContreller: ModalController) {}

  ngOnInit() {
    this.map = new Map({
      container: 'selectMap', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw',
      attributionControl: false,
      center: [-1.685128, 42.781851],
      zoom: 17,
    });
    this.map.on('load', () => {
      this.map.resize();
    });
    this.marker = new Marker({
      draggable: true,
      color: 'pink',
    })
      .setLngLat([-1.685128, 42.781851])
      .addTo(this.map);

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
