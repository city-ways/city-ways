import { Component, Input, OnInit } from '@angular/core';
import { Parking } from '../../shared/parking';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.scss'],
})
export class ParkingListComponent implements OnInit {
  @Input() isOpen: boolean;
  @Input() parkingData: Parking[];
  constructor() {}

  ngOnInit() {}
}
