import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingListModalComponent } from '../../shared/parking-list-modal/parking-list-modal.component';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  @ViewChild('modalList') modalList: ParkingListModalComponent;
  constructor() {}

  ngOnInit() {}
  showModal() {
    this.modalList.showModal();
  }
}
