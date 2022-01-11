import { Component, Input, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit() {}
}
