import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../User';
import { UserService } from '../../core/user.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() type = 'Registro';
  @Input() data: User;

  userData: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.warn(this.data);
    this.userData = this.formBuilder.group({
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
    });

    if (this.type === 'editar') {
      this.loadData(this.data);
    }
  }

  castToUser(object: any): User {
    const { mail, username, password, dni } = object;

    return {
      id: this.data?.id,
      name: username,
      mail,
      password,
      dni,
    } as User;
  }
  sendForm() {
    if (this.type === 'editar') {
      this.userData.patchValue({
        password: 'never reaches the backend',
      });
    }
    console.warn(this.userData.value);
    console.log(this.userData.valid);
    if (this.userData.valid) {
      if (this.userData.dirty) {
        const user: User = this.castToUser(this.userData.value);
        console.warn(user);
        if (this.type !== 'editar') {
          this.authService.register(user).subscribe((response) => {
            // if (response !== 200) {
            //   return 'Error';
            // }
            this.router.navigate(['/login']);
          });
        } else {
          this.userService
            .updateUser(user)
            .subscribe((updateRes) => console.warn('ec'));
        }
      }
    }
  }
  loadData(user: User) {
    if (this.userData) {
      this.userData.reset();
    }
    this.userData.patchValue({
      username: user.name,
      mail: user.mail,
      dni: user.dni,
    });
  }
  exit() {
    this.modalController.dismiss();
  }
}
