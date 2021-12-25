import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  @Output() newParking = new EventEmitter();
  @Output() editParking = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  addNewParkingEmit(): void {
    this.newParking.emit();
  }
  editParkingEmit(): void {
    this.editParking.emit();
  }
}
