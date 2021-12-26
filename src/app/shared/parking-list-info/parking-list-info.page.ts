import { Component, OnInit } from '@angular/core';
import { Parking } from '../parking';
import { ParkingService } from '../../core/parking.service';
import { UserIdService } from '../../core/user-id.service';

@Component({
  selector: 'app-parking-list-info',
  templateUrl: './parking-list-info.page.html',
  styleUrls: ['./parking-list-info.page.scss'],
})
export class ParkingListInfoPage implements OnInit {
  public parkingsOfUser: Parking[];
  private idUser: string;
  constructor(
    private parkingService: ParkingService,
    private idUserService: UserIdService
  ) {}

  ngOnInit() {
    // get the id of the user
    this.idUserService.id.subscribe((id) => {
      this.idUser = id;
    });
    // get all parkings of the user
    this.parkingService
      .getParkingsOfUser(this.idUser)
      .subscribe((parkings) => (this.parkingsOfUser = parkings));
  }
}
