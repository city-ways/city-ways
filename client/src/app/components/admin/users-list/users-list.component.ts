import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../../core/user.service';
import { User } from '../../../shared/User';
import { Parking } from '../../../shared/parking';
import { ParkingFormPage } from '../../../shared/parking-form/parking-form.page';
import { ModalController, ToastController } from '@ionic/angular';
import { RegisterPage } from '../../../shared/user-form/register.page';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input() reloadTrigger: boolean;
  public users: User[];
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((value) => {
      this.presentToast('Se ha eliminado el usuario');
    });
  }
  async showModalPage(user?: User) {
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        type: 'editar',
        data: user,
      },
    });
    return await modal.present();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService
      .getAllUsers()
      .subscribe((userLst) => (this.users = userLst));
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      color: 'tertiary',
      message: text,
      duration: 2000,
    });
    toast.present();
  }
}
