import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../core/parking.service';
import { UserService } from '../../core/user.service';
import { data } from 'autoprefixer';
import { AuthService } from '../../core/auth.service';
import { filter, switchMap, takeWhile } from 'rxjs/operators';
import { iif } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public editModalIsOpen: boolean;
  public isAdmin = false;
  mySubscription: any;
  constructor(
    private parkingService: ParkingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.authService.admin.subscribe((res) => {
      console.log('res', res);
      if (res === undefined) {
        this.authService.decodeToken();
      } else {
        this.isAdmin = res;
      }
    });
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
