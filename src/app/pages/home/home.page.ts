import { Component, OnInit } from '@angular/core';
import { ParkingService } from 'src/app/core/parking.service';
import { Parking } from 'src/app/shared/parking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  parkings: Parking[] = [];
  constructor(private parkingService: ParkingService, private router: Router) {}

  ngOnInit() {
    this.parkingService
      .getParkings()
      .subscribe((data: Parking[]) => (this.parkings = data));
  }
}
