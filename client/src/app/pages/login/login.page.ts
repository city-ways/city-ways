import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../core/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {}
  sendForm(formData) {
    const { username, password } = formData.value;
    this.authService.login(username, password).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('auth_token', response.token);
    });
    console.log(formData.value);
  }
}
