import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formBook: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService
  ) {}
  ngOnInit(): void {
    this.parkingService.getParkingById(this.id).subscribe((data) => {
      this.parkingData = data;
    });
    this.formBook = this.formBuilder.group({
      periodsStrart: ['', Validators.required],
      periodsEnd: ['', Validators.required],
    });
  }
  sendForm() {
    let valido: boolean = true;
    console.log(this.formBook.controls['periodsStrart'].value());
    if (this.parkingData.type === 'larga estancia') {
      valido = this.periodoValido(this.parkingData.daysAvailable);
    } else {
      valido = this.periodoValido(this.parkingData.timesAvailable);
    }
  }
  periodoValido(data?: { start: number; end: number }[]) {
    data.forEach((periodo: { start: number; end: number }, index: number) => {
      if (
        this.formBook.controls['periodsStrart'].value() >= periodo.start &&
        this.formBook.controls['periodsEnd'].value() <= periodo.end
      ) {
        return true;
      }
    });
    return false;
  }
  typeParking() {
    return this.parkingData.type === 'larga estancia' ? 'Date' : 'time';
  }
  reserva() {}
}
