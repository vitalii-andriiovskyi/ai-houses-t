import { Module } from '@nestjs/common';
import { AiHouseService } from './ai-house.service';
import { AiHouseController } from './ai-house.controller';

@Module({
  controllers: [AiHouseController],
  providers: [AiHouseService],
})
export class AiHouseModule {}
