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
      hoursRanges: this.formBuilder.array([]),
      daysRanges: this.formBuilder.array([]),
      hourPrice: '',
      dayPrice: '',
    });
  }

  getHoursRangesInputs(): FormArray {
    return this.parkingData.get('hoursRanges') as FormArray;
  }
  getDaysRangesInputs(): FormArray {
    return this.parkingData.get('daysRanges') as FormArray;
  }
  getTypeParking(): boolean {
    return this.parkingData.get('longPeriod').value;
  }
  addPriceInput() {
    (this.getTypeParking()
      ? this.getDaysRangesInputs()
      : this.getHoursRangesInputs()
    ).push(
      this.formBuilder.control({
        start: ['', Validators.required],
        end: ['', Validators.required],
      })
    );
  }
  clearInputs() {
    // todo: refactor
    if (this.getTypeParking()) {
      this.parkingData.get('dayPrice').setValidators([Validators.required]);
    } else {
      this.parkingData.get('hourPrice').setValidators([Validators.required]);
    }
    this.getHoursRangesInputs().clear();
    this.getDaysRangesInputs().clear();
  }
  deleteInput(i: number) {
    (this.getTypeParking()
      ? this.getDaysRangesInputs()
      : this.getHoursRangesInputs()
    ).removeAt(i);
  }
}
