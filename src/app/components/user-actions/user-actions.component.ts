import { Component, OnInit } from '@angular/core';
import { UserIdService } from '../../core/user-id.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent implements OnInit {
  public name: string;
  constructor(private userService: UserIdService) {}
  // todo: refactorizar con el servico de usurios
  ngOnInit() {}
}
