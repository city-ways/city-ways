import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user.service';
import { User } from '../../../shared/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAllUsers()
      .subscribe((userLst) => (this.users = userLst));
  }
}
