import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.page.html',
  styleUrls: ['./edit-parking.page.scss'],
})
export class EditParkingPage implements OnInit {
  parkingData: Parking;
  constructor(
    private parkingService: ParkingService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: number = parseInt(this.activatedroute.snapshot.params['id']);
    this.parkingService
      .getParkingById(id)
      .subscribe((parking) => (this.parkingData = parking));
  }
}
