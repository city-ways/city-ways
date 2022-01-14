import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from 'src/app/core/parking.service';
import { Parking } from '../parking';

@Component({
  selector: 'app-parking-data',
  templateUrl: './parking-data.component.html',
  styleUrls: ['./parking-data.component.scss'],
})
export class ParkingDataComponent implements OnInit {
  @Input() type: string;
  @Input() data: Parking;
  // todo: refactor output event, dont emit the event! make the api call on this page.
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  parkingData: FormGroup;
  pageTitle: string;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService
  ) {}
  ngOnInit() {
    this.parkingData = this.formBuilder.group({
      direction: ['', Validators.required],
      longPeriod: [false, Validators.required],
      timesAvailable: this.formBuilder.array([]),
      daysAvailable: this.formBuilder.array([]),
      pricePerHour: '',
      pricePerDay: '',
    });

    if (this.type === 'editar') {
      this.loadData(this.data);
    }
  }

  getHoursRangesInputs(): FormArray {
    return this.parkingData.get('timesAvailable') as FormArray;
  }
  getDaysRangesInputs(): FormArray {
    return this.parkingData.get('daysAvailable') as FormArray;
  }
  getTypeParking(): boolean {
    return this.parkingData.get('longPeriod').value;
  }
  // dynamic controls
  addPriceInput() {
    (this.getTypeParking()
      ? this.getDaysRangesInputs()
      : this.getHoursRangesInputs()
    ).push(
      this.formBuilder.group({
        start: ['', Validators.required],
        end: ['', Validators.required],
      })
    );
  }
  deleteInput(i: number) {
    (this.getTypeParking()
      ? this.getDaysRangesInputs()
      : this.getHoursRangesInputs()
    ).removeAt(i);
  }

  clearInputs() {
    // todo: refactor
    if (this.getTypeParking()) {
      this.parkingData.get('pricePerDay').setValidators([Validators.required]);
    } else {
      this.parkingData.get('pricePerHour').setValidators([Validators.required]);
    }
    this.getHoursRangesInputs().clear();
    this.getDaysRangesInputs().clear();
  }

  sendForm() {
    if (this.parkingData.valid) {
      if (this.parkingData.dirty) {
        if (this.type === 'editar') {
          this.parkingService.updateParking(this.parkingData.value);
        }
      }
    } else {
      // show errors
    }
  }

  loadData(data: Parking) {
    if (this.parkingData) {
      this.parkingData.reset();
    }
    console.log(data.daysAvailable);
    this.pageTitle = `Parking: ${data.direction}`;
    this.parkingData.patchValue({
      direction: data.direction,
      longPeriod: data.type !== 'corta estancia',
      timesAvailable: data.timesAvailable,
      daysAvailable: data.daysAvailable,
      pricePerHour: data.pricePerHour,
      pricePerDay: data.pricePerDay,
    });
  }

  addNewParking(e: any) {
    // todo create new Parking
    const {
      direction,
      longPeriod,
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
    } = e;

    let parking: Parking = {
      id: 0,
      direction,
      cords: null,
      status: false,
      type: longPeriod ? 'larga estancia' : 'corta estancia',
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
      user: null,
      ranking: 0,
    };
    this.parkingService
      .getMaxParkingId()
      .subscribe((id) => (parking.id = ++id));
    this.parkingService
      .createParking(parking)
      .subscribe(() => console.log('fd'));
    this.parkingService
      .getParkingById(parking.id)
      .subscribe((data) => console.log(data));
    // console.log(e);
  }
}
