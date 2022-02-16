import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  helper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token: any = this.helper.decodeToken(
      localStorage.getItem('auth_token')
    );
    console.log(token);
    if (token) {
      this.authService.setRole(token.roles[0]);
    }
  }
}
