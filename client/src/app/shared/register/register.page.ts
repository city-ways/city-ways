import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../User';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() type: string;
  @Input() data: User;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private url = `${environment.apiUrlBase}/register`;
  userData: FormGroup;
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.userData = this.formBuilder.group({
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required]
    });
    /*
    if (this.type === 'editar') {
      this.loadData(this.data);
    }*/
  }

  castToUser(object: any): User {
    const {
      mail,
      username,
      password,
      dni,
    } = object;

    return {
      id: 0,
      name: username,
      mail: mail,
      password: password,
      dni: dni,
    } as User;
  }
  sendForm(){
    let user: User = this.castToUser(this.userData.value);
    this.router.navigate(['/login']);
    this.http.put(`${this.url}}`, user, {
      headers: this.headers,
    }).subscribe(response => {
      if (response != 200){
        return "Error"
      }
    })
  }
}
