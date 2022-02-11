import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
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

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() type: string;
  @Input() data: User;

  userData: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userData = this.formBuilder.group({
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
    });
    /*
    if (this.type === 'editar') {
      this.loadData(this.data);
    }*/
  }

  castToUser(object: any): User {
    const { mail, username, password, dni } = object;

    return {
      id: 0,
      name: username,
      mail,
      password,
      dni,
    } as User;
  }
  sendForm() {
    // todo: comprobar si el formulario es valido y esta dirty
    const user: User = this.castToUser(this.userData.value);
    this.userService.register(user).subscribe((response) => {
      if (response !== 200) {
        return 'Error';
      }
      this.router.navigate(['/login']);
    });
  }
}
