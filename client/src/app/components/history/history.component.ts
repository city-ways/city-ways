import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HistoryService } from '../../core/history.service';
import { History } from '../../shared/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnChanges {
  @Input() reloadTrigger: boolean;
  public history: History[];
  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
  loadData() {
    this.historyService.historyOfUSer().subscribe((history) => {
      this.history = history;
      console.log(history);
    });
  }
}
