import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  sendForm(formData) {
    const { username, password } = formData.value;
    this.authService.login(username, password).subscribe((response: any) => {
      localStorage.setItem('auth_token', response.token);
      this.router.navigate(['app/map']);
    });
    console.log(formData.value);
  }
}
