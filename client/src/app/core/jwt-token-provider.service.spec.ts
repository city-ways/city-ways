import { TestBed } from '@angular/core/testing';

import { JwtTokenProviderService } from './jwt-token-provider.service';

describe('JwtTokenProviderService', () => {
  let service: JwtTokenProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtTokenProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
