import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { SeoEntity } from './entities/seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeoEntity])],
  controllers: [SeoController],
  providers: [SeoService],
})
export class SeoModule {}
