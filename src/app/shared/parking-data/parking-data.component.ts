import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking-data',
  templateUrl: './parking-data.component.html',
  styleUrls: ['./parking-data.component.scss'],
})
export class ParkingDataComponent implements OnInit {
  @Input() title;
  parkingData: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.parkingData = this.formBuilder.group({
      direction: ['', Validators.required],
      longPeriod: [false, Validators.required],
      pricePerHour: this.formBuilder.array([]),
      pricePerDay: this.formBuilder.array([]),
    });
  }

  getHourPriceInputs(): FormArray {
    return this.parkingData.get('pricePerHour') as FormArray;
  }
  getDayPriceInputs(): FormArray {
    return this.parkingData.get('pricePerDay') as FormArray;
  }
  getTypeParking(): boolean {
    return this.parkingData.get('longPeriod').value;
  }
  addPriceInput() {
    (this.getTypeParking()
      ? this.getDayPriceInputs()
      : this.getHourPriceInputs()
    ).push(
      this.formBuilder.control({
        start: ['', Validators.required],
        end: ['', Validators.required],
      })
    );

    console.log(this.getHourPriceInputs().controls);
  }
  clearInputs() {
    // todo: refactor
    this.getHourPriceInputs().clear();
    this.getDayPriceInputs().clear();
    console.log('ff');
  }
}
