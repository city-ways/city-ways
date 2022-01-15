import { TestBed } from '@angular/core/testing';

import { ParkingDataService } from './parking-data.service';

describe('ParkingDataService', () => {
  let service: ParkingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
