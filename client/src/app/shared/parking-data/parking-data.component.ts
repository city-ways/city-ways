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

import { ModalController } from '@ionic/angular';
import { SelectionMapPage } from '../../pages/selection-map/selection-map.page';

@Component({
  selector: 'app-parking-data',
  templateUrl: './parking-data.component.html',
  styleUrls: ['./parking-data.component.scss'],
})
export class ParkingDataComponent implements OnInit {
  @Input() type: string;
  @Input() data: Parking;
  @Output() actionsFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  parkingData: FormGroup;
  pageTitle: string;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private modalController: ModalController
  ) {}
  ngOnInit() {
    this.parkingData = this.formBuilder.group({
      direction: ['', Validators.required],
      lng: ['', Validators.required],
      lat: ['', Validators.required],
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
    console.log(this.parkingData.get('lng').value);
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
        // close form
        this.emitFinishEvent();
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
      lng: parking.cords.longitude,
      lat: parking.cords.latitude,
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
    });
    console.log(this.parkingData.value);
  }

  deleteCurrentParking() {
    this.parkingService
      .deleteParking(this.data.id)
      .subscribe((e) => this.emitFinishEvent());
  }

  emitFinishEvent() {
    this.actionsFinish.emit(true);
  }

  castToParking(object: any): Parking {
    const {
      direction,
      lng,
      lat,
      longPeriod,
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
    } = object;

    return {
      id: this.data?.id,
      direction,
      cords: !this.data ? { longitude: lng, latitude: lat } : this.data.cords,
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

  async mapModal() {
    const modal = await this.modalController.create({
      component: SelectionMapPage,
    });
    await modal.present();

    const {
      data: [lng, lat],
    } = await modal.onDidDismiss();
    // assign the values to the form
    this.parkingData.patchValue({
      lng,
      lat,
    });
  }
}
