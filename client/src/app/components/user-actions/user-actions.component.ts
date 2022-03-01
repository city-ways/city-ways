import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent implements OnInit {
  @Input() name: string;
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  logOut() {
    this.authService.logout();
  }
}
