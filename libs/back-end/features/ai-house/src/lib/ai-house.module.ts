import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiHouseService } from './ai-house.service';
import { AiHouseController } from './ai-house.controller';
import { AiHouseEntity } from './entities/ai-house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiHouseEntity])],
  controllers: [AiHouseController],
  providers: [AiHouseService],
})
export class AiHouseModule {}
