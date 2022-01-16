import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      console.log(' enter2', this.data);
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
    console.log('tipo:', this.getTypeParking());
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
        let parking: Parking = this.castToParking(this.parkingData.value);
        console.warn(parking);
        if (this.type === 'editar') {
          // update parking
          this.parkingService
            .updateParking(parking)
            .subscribe((pk) => console.log('Parking update', pk));
        } else {
          // new parking
          this.parkingService
            .getMaxParkingId()
            .subscribe((id) => (parking.id = ++id));
          this.parkingService
            .createParking(parking)
            .subscribe((pk) => console.log('Parking creado', pk));
        }

        console.log(this.parkingData.value);
      }
    } else {
      // show errors
    }
  }

  loadData(parking: Parking) {
    if (this.parkingData) {
      this.parkingData.reset();
    }
    this.pageTitle = `Parking: ${parking.direction}`;
    // load static data of the parking
    this.parkingData.patchValue({
      direction: parking.direction,
      longPeriod: parking.type === 'larga estancia',
      pricePerHour: parking.pricePerHour,
      pricePerDay: parking.pricePerDay,
    });
    // generate the n number of ranges inputs
    (!parking.daysAvailable.length
      ? parking.timesAvailable
      : parking.daysAvailable
    ).map((range) => this.addPriceInput());
    // add the corresponded data to each range inputs
    (this.getDaysRangesInputs().controls.length === 0
      ? this.getHoursRangesInputs()
      : this.getDaysRangesInputs()
    ).controls.forEach((rangeGroup: FormGroup, index: number) => {
      // take one control group { start: FormControl; end: FormControl } and set value
      const control: { start: FormControl; end: FormControl } =
        rangeGroup.controls as unknown as {
          start: FormControl;
          end: FormControl;
        };
      if (parking.type === 'larga estancia') {
        control.start.setValue(parking.daysAvailable[index].start);
        control.end.setValue(parking.daysAvailable[index].end);
      } else {
        control.start.setValue(parking.timesAvailable[index].start);
        control.end.setValue(parking.timesAvailable[index].end);
      }
      // iterate throw the two FormControl (start and end) of the FormGroup
      // Object.entries(control).forEach(([, input]) => {
      //   input.setValue(
      //     (parking.type === 'larga estancia'
      //       ? parking.daysAvailable
      //       : parking.timesAvailable)[index].start
      //   );
      // });
    });
    console.log(this.parkingData.value);
  }

  castToParking(object: any): Parking {
    const {
      direction,
      longPeriod,
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
    } = object;

    return {
      id: this.data?.id,
      direction,
      cords: this.data?.cords,
      status: false,
      type: longPeriod ? 'larga estancia' : 'corta estancia',
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
      user: this.data?.user,
      ranking: this.data?.ranking,
    } as Parking;
  }
}
