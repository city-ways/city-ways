import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  helper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Connection error',
      message: 'No se ha podido realizar la conexión con el servidor. Por favor intentalo más tarde.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {}
  sendForm(formData) {
    const { username, password } = formData.value;
    this.authService.login(username, password).subscribe((response: any) => {
      if (response.status == 401){
        this.presentAlert();
        this.router.navigate(['/login']);
      }
      localStorage.setItem('auth_token', response.token);
      this.router.navigate(['app/map']);
    });
  }
}
