import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public isAdmin = false;
  public reload = false;
  public userName: string;
  constructor(
    private parkingService: ParkingService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.reload = !this.reload;
    console.warn(this.reload);
    this.authService.admin.subscribe((res) => {
      console.log('Admin -->', res);
      if (res === undefined) {
        this.authService.decodeToken();
      } else {
        this.isAdmin = res;
      }
    });
    this.userService.getUser().subscribe((user) => {
      this.userName = user.name;
      console.log('userData -->', user);
    });
  }
}
