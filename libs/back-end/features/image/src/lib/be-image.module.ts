import { Module } from '@nestjs/common';
import { ImageModule } from './image.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [ImageModule],
})
export class BeImageModule {}
