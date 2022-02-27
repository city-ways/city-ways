import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  sendForm(formData) {
    const { username, password } = formData.value;
    this.authService.login(username, password).subscribe(
      (response: any) => {
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['app/map']);
      },
      (error) => {
        this.presentAlert();
      }
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'El usuario y/o la contraseña no son validos.',
      buttons: ['OK'],
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
}
