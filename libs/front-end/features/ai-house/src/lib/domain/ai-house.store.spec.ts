import { TestBed } from '@angular/core/testing';

import { AiHouseStore } from './ai-house.store';

describe('AiHouseStore', () => {
  let service: AiHouseStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiHouseStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
