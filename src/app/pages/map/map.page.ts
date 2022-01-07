import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map!: mapboxgl.Map;
  constructor() {}

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map', //  containerID
      style: 'mapbox://styles/fgergfer/ckx2flh2d12km14pcyrf8mfqw', // style URL
      center: [-1.685128, 42.781851],
      zoom: 17,
    });
    this.map.on('load', () => {
      this.map.resize();
    });
  }
}
