import { Test, TestingModule } from '@nestjs/testing';
import { AiHouseService } from './ai-house.service';

describe('AiHouseService', () => {
  let service: AiHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiHouseService],
    }).compile();

    service = module.get<AiHouseService>(AiHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
