import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent implements OnInit {
  public name: string;
  constructor(private authService: AuthService, private router: Router) {}
  // todo: refactorizar con el servico de usurios
  ngOnInit() {}

  logOut() {
    this.authService.logout();
  }
}
