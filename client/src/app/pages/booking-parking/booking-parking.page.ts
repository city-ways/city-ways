import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';

@Component({
  selector: 'app-booking-parking',
  templateUrl: './booking-parking.page.html',
  styleUrls: ['./booking-parking.page.scss'],
})
export class BookingParkingPage implements OnInit {
  @Input() id: number;
  formBook: FormGroup;
  inputType: string;
  parking: Parking;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    // todo: check if the user is already using a parking
    this.formBook = this.formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
    });

    this.parkingService.getParkingById(this.id).subscribe((parking) => {
      this.parking = parking;
      this.inputType = parking.type === 'larga estancia' ? 'Date' : 'time';
      console.log(this.parking);
    });
  }
  send() {
    console.log('enviado');
    // e.preventDefault();
    // console.log('f');
    // if (this.formBook.valid) {
    //   if (this.formBook.dirty) {
    //     console.log('enviado');
    //     // update the parking
    //     const { startPeriod, endPeriod } = this.formBook.value;
    //     console.log(startPeriod, endPeriod);
    //     // todo: logic of booking a parking
    //   }
    // }
  }
}
