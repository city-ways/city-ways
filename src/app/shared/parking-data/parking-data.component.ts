import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking-data',
  templateUrl: './parking-data.component.html',
  styleUrls: ['./parking-data.component.scss'],
})
// ! bug: a la hora de generar los nuevos inputs, Cannot find control with path: 'pricePerHour
export class ParkingDataComponent implements OnInit {
  @Input() title;
  parkingData: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.parkingData = this.formBuilder.group({
      direction: ['', Validators.required],
      longPeriod: ['', Validators.required],
      pricePerHour: this.formBuilder.array([]),
      pricePerDay: this.formBuilder.array([]),
    });
  }

  getPriceInputs(): FormArray {
    return this.parkingData.get('pricePerHour') as FormArray;
  }
  addPriceInput(dayInput: boolean) {
    if (dayInput) {
      const timestampSelector = this.parkingData.controls
        .pricePerHour as FormArray;
      timestampSelector.push(
        this.formBuilder.group({
          start: '',
          end: '',
        })
      );
    }
  }
}
