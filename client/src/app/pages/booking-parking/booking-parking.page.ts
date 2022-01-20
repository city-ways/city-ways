import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../core/parking.service';

@Component({
  selector: 'app-booking-parking',
  templateUrl: './booking-parking.page.html',
  styleUrls: ['./booking-parking.page.scss'],
})
export class BookingParkingPage implements OnInit {
  @Input() id: number;
  formBook: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.formBook = this.formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
    });
  }
  send() {
    console.log('enviado');
  }
}
