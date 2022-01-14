import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { ActivatedRoute } from '@angular/router';
import { ParkingDataComponent } from 'src/app/shared/parking-data/parking-data.component';

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.page.html',
  styleUrls: ['./edit-parking.page.scss'],
})
export class EditParkingPage implements OnInit {
  @Input() parking: Parking;
  constructor(
    private parkingService: ParkingService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log(this.parking);
  }
}
