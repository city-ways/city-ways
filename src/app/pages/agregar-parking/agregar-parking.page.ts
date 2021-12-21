import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../../core/parking.service';

@Component({
  selector: 'app-agregar-parking',
  templateUrl: './agregar-parking.page.html',
  styleUrls: ['./agregar-parking.page.scss'],
})
export class AgregarParkingPage implements OnInit {
  parkingForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.parkingForm = this.formBuilder.group({
      direccion: ['', Validators.required],
      type: '',

    });
  }
  public addParking(parking: ParkingService) {}
}
