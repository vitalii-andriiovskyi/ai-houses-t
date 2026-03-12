import { TestBed } from '@angular/core/testing';

import { AiHouseApi } from './ai-house.api';

describe('AiHouseApi', () => {
  let service: AiHouseApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiHouseApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
