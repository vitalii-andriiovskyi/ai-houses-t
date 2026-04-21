import { Test, TestingModule } from '@nestjs/testing';
import { AiHouseController } from './ai-house.controller';
import { AiHouseService } from './ai-house.service';

describe('AiHouseController', () => {
  let controller: AiHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiHouseController],
      providers: [AiHouseService],
    }).compile();

    controller = module.get<AiHouseController>(AiHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
