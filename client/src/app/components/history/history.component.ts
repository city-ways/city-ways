import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../core/history.service';
import { History } from '../../shared/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public history: History[];
  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.historyService
      .historyOfUSer()
      .subscribe((history) => (this.history = history));
  }
}
