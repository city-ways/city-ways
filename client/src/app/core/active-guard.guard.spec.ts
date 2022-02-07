import { TestBed } from '@angular/core/testing';

import { ActiveGuardGuard } from './active-guard.guard';

describe('ActiveGuardGuard', () => {
  let guard: ActiveGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActiveGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
