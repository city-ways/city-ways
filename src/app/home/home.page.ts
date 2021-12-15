import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../core/parking.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {}
}
