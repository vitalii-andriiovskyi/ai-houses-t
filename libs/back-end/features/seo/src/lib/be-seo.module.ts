import { Module } from '@nestjs/common';
import { SeoModule } from './seo.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [SeoModule],
})
export class BeSeoModule {}
