import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parking } from '../parking';

@Component({
  selector: 'app-parking-list-info',
  templateUrl: './parking-list-info.page.html',
  styleUrls: ['./parking-list-info.page.scss'],
})
export class ParkingListInfoPage implements OnInit {
  @Input() parkingList: Parking[];
  @Input() route: string;
  @Output() parkingEmmited: EventEmitter<Parking> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log(this.parkingList);
  }
  parkingEmmiter(index) {
    this.parkingEmmited.emit(this.parkingList[index]);
  }
}
