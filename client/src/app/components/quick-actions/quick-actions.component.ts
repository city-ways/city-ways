import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../core/user.service';
import { Parking } from '../../shared/parking';
import { ModalController } from '@ionic/angular';
import { ParkingListInfoPage } from '../../shared/parking-list-info/parking-list-info.page';
import { ParkingFormPage } from '../../shared/parking-form/parking-form.page';
import { User } from '../../shared/User';
import { RegisterPage } from '../../shared/user-form/register.page';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit, OnChanges {
  @Input() reloadTrigger: boolean;
  user: User;
  parkingsOfUser: Parking[];

  constructor(
    private userService: UserService,
    public modalController: ModalController
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngOnInit() {
    // this.userService.user
    //   .pipe(
    //     filter((value) => value !== null),
    //     switchMap((user) => this.userService.getUser(user.id))
    //   )
    //   .subscribe((res) => {
    //     this.idUser = res.id;
    //     this.parkingsOfUser = res.owns;
    //   });
    // this.loadData();
  }

  loadData() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.parkingsOfUser = user.owns;
    });
  }

  showModal() {
    console.log('owns-->', this.parkingsOfUser);
    if (this.parkingsOfUser.length > 1) {
      this.showModalList();
    } else {
      this.showModalPage(this.parkingsOfUser[0], false);
    }
  }

  async showModalPage(parking?: Parking | null, create?: boolean) {
    const modal = await this.modalController.create({
      component: ParkingFormPage,
      componentProps: {
        type: create ? 'crear' : 'editar',
        user: this.user.id,
        data: create ? null : parking,
      },
    });
    return await modal.present();
  }
  async showModalPageProfile() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        type: 'editar',
        data: this.user,
      },
    });
    return await modal.present();
  }
  async showModalList() {
    const modal = await this.modalController.create({
      component: ParkingListInfoPage,
      componentProps: {
        user: this.user.id,
      },
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
    // return the parking the user clicked on the list
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('enter', data.parking);
      this.showModalPage(data.parking);
    }
  }
}
