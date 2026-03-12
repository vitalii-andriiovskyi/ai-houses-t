import { TestBed } from '@angular/core/testing';

import { AiHouseService } from './ai-house.service';

describe('AiHouseService', () => {
  let service: AiHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
