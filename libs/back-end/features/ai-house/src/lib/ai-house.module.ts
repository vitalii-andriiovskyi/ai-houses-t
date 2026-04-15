/* eslint-disable @nx/enforce-module-boundaries */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiHouseService } from './ai-house.service';
import { AiHouseController } from './ai-house.controller';
import { AiHouseEntity } from './entities/ai-house.entity';
import { ImageModule } from '@be/image';
import { SeoModule } from '@be/seo';
import { AddressModule } from '@be/address';
import { AiHouseAdminController } from './ai-house-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiHouseEntity]),
    forwardRef(() => ImageModule),
    forwardRef(() => SeoModule),
    forwardRef(() => AddressModule),
  ],
  controllers: [AiHouseController, AiHouseAdminController],
  providers: [AiHouseService],
  exports: [AiHouseService, TypeOrmModule],
})
export class AiHouseModule {}
