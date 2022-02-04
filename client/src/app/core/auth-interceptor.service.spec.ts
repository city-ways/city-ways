import { TestBed } from '@angular/core/testing';

import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
