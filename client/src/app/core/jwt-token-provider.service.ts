import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from '../shared/User';

@Injectable()
export class JwtTokenProviderService {
  helper = new JwtHelperService();
  constructor(private userService: UserService) {}
  // this service is always run before the angular application is started, see app.module.ts for the config
  // checks if the stored token is valid and has not expired
  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token =
        localStorage.getItem('auth_token') === null
          ? false
          : localStorage.getItem('auth_token');
      if (token !== false) {
        try {
          if (this.helper.isTokenExpired(token) === true) {
            localStorage.removeItem('auth_token');
          } else {
            this.userService.updateUser(
              this.helper.decodeToken(token).username
            );
            console.log(
              'Expiration Date:',
              this.helper.getTokenExpirationDate(token)
            );
          }
        } catch (exception) {
          localStorage.removeItem('auth_token');
        }
      }
      resolve(true);
      // reject('Invalid Token');
    });
  }
}
