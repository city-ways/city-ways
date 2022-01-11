import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.page.html',
  styleUrls: ['./book-parking.page.scss'],
})
export class BookParkingPage implements OnInit {
  parkingData: Parking;
  direction: string;
  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private packService: ParkingService
  ) {}
  @Input() id: number;
  ngOnInit(): void {
    this.packService
      .getParkingById(this.id)
      .subscribe((data: Parking) => (this.parkingData = data));
    console.log(this.parkingData);
  }
}
