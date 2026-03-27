import { Module } from '@nestjs/common';
import { AiHouseModule } from './ai-house.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [AiHouseModule],
})
export class BeAiHouseModule {}
