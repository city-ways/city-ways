import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingListModalComponent } from '../../shared/parking-list-modal/parking-list-modal.component';
import { ParkingService } from '../../core/parking.service';
import { UserIdService } from '../../core/user-id.service';
import { Parking } from '../../shared/parking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  @ViewChild('modalList') modalList: ParkingListModalComponent;
  idUser: string;
  parkingsOfUser: Parking[];
  constructor(
    private parkingService: ParkingService,
    private idUserService: UserIdService,
    private router: Router
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
  showModal(route: string, parkings: Parking[]) {
    if (parkings.length === 1) {
      this.router.navigate([route]);
    }
    this.modalList.showModal(route, parkings);
  }
}
