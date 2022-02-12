import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { UserService } from '../../core/user.service';
import { data } from 'autoprefixer';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public editModalIsOpen: boolean;
  private isAdmin = false;
  constructor(
    private parkingService: ParkingService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.admin.subscribe((role) => (this.isAdmin = role));
    this.userService.getUser().subscribe((user) => {
      console.log('DATA', user);
    });
    console.log(this.isAdmin);
  }
  newParking() {
    console.log('ff');
  }
  editParking() {
    this.editModalIsOpen = true;
  }
}
