import { TestBed } from '@angular/core/testing';

import { VehicleStore } from './vehicle.store';

describe('VehicleStore', () => {
  let service: VehicleStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
