import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { VehicleService } from './vehicle.service';
import { VehicleEntity } from './entities/vehicle.entity';
import { ImageService } from '@be/image';
import { SeoService } from '@be/seo';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(VehicleEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: ImageService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: SeoService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
