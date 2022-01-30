import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { UserIdService } from '../../core/user-id.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public editModalIsOpen: boolean;
  constructor(
    private parkingService: ParkingService,
    private userIdService: UserIdService
  ) {}
  ngOnInit() {
    // todo: refactorizar
    this.userIdService.updateId(2);
    this.userIdService.id.subscribe((data) => console.log(data));
  }
  newParking() {
    console.log('ff');
  }
  editParking() {
    this.editModalIsOpen = true;
  }
}
