import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../../core/parking.service';
import { Parking } from '../../shared/parking';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.page.html',
  styleUrls: ['./book-parking.page.scss'],
})
export class BookParkingPage implements OnInit {
  plaza!: Parking;
  plazaId: number;
  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private packService: ParkingService
  ) {}

  ngOnInit(): void {
    this.plazaId = parseInt(this.activatedroute.snapshot.params['id']);
    this.packService
      .getParkingById(this.plazaId)
      .subscribe((data: Parking) => (this.plaza = data));
  }
}
