import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';
import { AlertController } from '@ionic/angular';
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
  validRanges: string[];
  dateValue = '';
  dateValue2 = '';
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // todo: check if the user is already using a parking
    this.formBook = this.formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
    });

    this.parkingService.getParkingById(this.id).subscribe((parking) => {
      this.parking = parking;
      if (parking.type === 'larga estancia') {
        this.inputType = 'Date';
        this.validRanges = [
          parking.daysAvailable[0].start.toString(),
          parking.daysAvailable[0].end.toString(),
        ];
      } else {
        this.inputType = 'time';
        const todayRange = new Date().getDay() - 1;
        this.validRanges = [
          parking.timesAvailable[todayRange]?.start?.toString(),
          parking.timesAvailable[todayRange]?.end?.toString(),
        ];
        console.log(todayRange);
        console.log(parking.timesAvailable);
      }
      console.log(this.validRanges);
    });
  }

  send() {
    if (this.formBook.valid) {
      if (this.formBook.dirty) {
        const { startPeriod, endPeriod } = this.formBook.value;
        if (this.inputType === 'time') {
          const pr = new Date();
          pr.setTime(startPeriod);
          console.log(pr);
        }
      }
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
