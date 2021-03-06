import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parking } from '../parking';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../User';
import { ParkingService } from '../../core/parking.service';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '../../core/user.service';
import { SelectionMapPage } from '../../pages/selection-map/selection-map.page';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.page.html',
  styleUrls: ['./parking-form.page.scss'],
})
export class ParkingFormPage implements OnInit {
  @Input() type: string;
  @Input() data: Parking;
  // @Output() actionsFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  parkingData: FormGroup;
  pageTitle: string;
  daysOfWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  private user: User;
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private modalController: ModalController,
    private userService: UserService,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    this.parkingData = this.formBuilder.group({
      direction: '',
      lng: ['', Validators.required],
      lat: ['', Validators.required],
      longPeriod: [false, Validators.required],
      timesAvailable: this.formBuilder.array([]),
      daysAvailable: this.formBuilder.array([]),
      pricePerHour: 0,
      pricePerDay: 0,
    });
    // let id: number;
    // this.userService.user.subscribe((idUser) => (id = idUser.id));
    this.userService.getUser().subscribe((user) => (this.user = user));

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
    const hrInputs = this.getHoursRangesInputs();
    const dayInputs = this.getDaysRangesInputs();
    const inputGroup = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    if (!this.getTypeParking()) {
      //parking type: short time
      if (hrInputs.length < 7) {
        hrInputs.push(inputGroup);
      }
    } else {
      if (dayInputs.length < 1) {
        dayInputs.push(inputGroup);
      }
    }
  }
  deleteInput(i: number) {
    (this.getTypeParking()
      ? this.getDaysRangesInputs()
      : this.getHoursRangesInputs()
    ).removeAt(i);
  }

  clearInputs() {
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
      if (
        (this.getTypeParking()
          ? this.getDaysRangesInputs()
          : this.getHoursRangesInputs()
        ).length === 0
      ) {
        this.presentToast('Tienes que almenos agregar un rango de horas/dias');
        return;
      }
      if (this.parkingData.dirty) {
        let parking: Parking = this.castToParking(this.parkingData.value);
        if (this.type === 'editar') {
          // update parking
          console.warn(parking);
          this.parkingService.updateParking(parking).subscribe((pk) => {
            console.log('Parking update', pk);
            this.presentToast('Has editado tu parking');
          });
        } else {
          // new parking
          this.parkingService
            .getMaxParkingId()
            .subscribe((id) => (parking.id = ++id));
          console.log('parking--->', parking);
          this.parkingService.createParking(parking).subscribe((pk) => {
            console.log('Parking creado', pk);
            this.presentToast('Se ha añadido el parking');
          });
        }
        // close form
        this.exit();
        console.log(this.parkingData.value);
      } else {
        this.presentToast('Haz cambios en el parking');
      }
    } else {
      // show errors
      this.presentToast('Revisa los campo necesarios');
      // this.presentToast();
    }
  }

  loadData(parking: Parking) {
    console.log('>>>', parking);
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
    this.parkingService.deleteParking(this.data.id).subscribe(
      (e) => this.exit(),
      (error) => {
        this.presentToast('No pues eliminar un parking que esta en uso');
      }
    );
  }

  // emitFinishEvent() {
  //   this.actionsFinish.emit(true);
  // }
  exit() {
    this.modalController.dismiss();
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
      status: this.data?.status ?? false,
      type: longPeriod ? 'larga estancia' : 'corta estancia',
      timesAvailable,
      daysAvailable,
      pricePerHour,
      pricePerDay,
      owner: !this.data ? this.user : this.data.owner,
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

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      color: 'tertiary',
      message: text,
      duration: 2000,
    });
    toast.present();
  }
}
