import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenProviderService {
  private helper = new JwtHelperService();
  constructor() {}
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
          }
        } catch (exception) {
          localStorage.removeItem('auth_token');
        }
      }
      resolve(true);
      reject('Invalid Token');
    });
  }
}
