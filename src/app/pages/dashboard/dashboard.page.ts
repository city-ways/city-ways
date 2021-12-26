import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { ParkingListModalComponent } from '../../shared/parking-list-modal/parking-list-modal.component';

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
