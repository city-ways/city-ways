import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  helper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  sendForm(formData) {
    const { username, password } = formData.value;
    this.authService.login(username, password).subscribe((response: any) => {
      localStorage.setItem('auth_token', response.token);
      this.authService.setRole(
        this.helper.decodeToken(response.token).roles[0]
      );
      this.router.navigate(['app/map']);
    });
    console.log(formData.value);
  }
}
