import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public editModalIsOpen: boolean;
  constructor(private parkingService: ParkingService) {}

  ngOnInit() {}
  newParking() {
    console.log('ff');
  }
  editParking() {
    this.editModalIsOpen = true;
  }
}
