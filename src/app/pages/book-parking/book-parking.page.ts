import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { share } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.page.html',
  styleUrls: ['./book-parking.page.scss'],
})
export class BookParkingPage implements OnInit {
  @Input() id: number;
  parkingData: Parking;
  formBook: FormGroup;
  type: string;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService
  ) {}
  ngOnInit(): void {
    this.parkingService.getParkingById(this.id).subscribe((data) => {
      this.parkingData = data;
      this.type = data.type === 'larga estancia' ? 'Date' : 'time';
    });
    this.formBook = this.formBuilder.group({
      periodStart: ['', Validators.required],
      periodEnd: ['', Validators.required],
    });
  }
  sendForm(e: any) {
    e.preventDefault();
    if (this.formBook.valid) {
      if (this.formBook.dirty) {
        console.log('!');
      }
    } else {
      throwError('formulario no valido');
    }
    // let valido: boolean = true;
    // console.log(this.formBook.controls['periodsStrart'].value());
    // if (this.parkingData.type === 'larga estancia') {
    //   valido = this.periodoValido(this.parkingData.daysAvailable);
    // } else {
    //   valido = this.periodoValido(this.parkingData.timesAvailable);
    // }
  }
  periodoValido(data?: { start: number; end: number }[]) {
    // data.forEach((periodo: { start: number; end: number }, index: number) => {
    //   if (
    //     this.formBook.controls['periodsStrart'].value() >= periodo.start &&
    //     this.formBook.controls['periodsEnd'].value() <= periodo.end
    //   ) {
    //     return true;
    //   }
    // });
    // return false;
  }

  reserva() {}
}
