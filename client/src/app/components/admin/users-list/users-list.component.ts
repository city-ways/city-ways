import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user.service';
import { User } from '../../../shared/User';
import { Parking } from '../../../shared/parking';
import { ParkingFormPage } from '../../../shared/parking-form/parking-form.page';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../../../shared/user-form/register.page';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: User[];
  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.userService
      .getAllUsers()
      .subscribe((userLst) => (this.users = userLst));
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
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
}
