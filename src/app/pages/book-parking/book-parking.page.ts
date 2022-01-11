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
  @Input() id: number;
  parkingData: Parking;
  direction: string;
  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService
  ) {}
  ngOnInit(): void {
    console.log(this.id);
    this.parkingService
      .getParkingById(this.id)
      .subscribe((data) => (this.parkingData = data));
  }
}
