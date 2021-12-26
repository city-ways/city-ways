import { Component, Input, OnInit } from '@angular/core';
import { Parking } from '../parking';

@Component({
  selector: 'app-parking-list-info',
  templateUrl: './parking-list-info.page.html',
  styleUrls: ['./parking-list-info.page.scss'],
})
export class ParkingListInfoPage implements OnInit {
  @Input() parkingList: Parking[];
  @Input() route: string;
  constructor() {}

  ngOnInit() {
    console.log(this.parkingList);
  }
}
