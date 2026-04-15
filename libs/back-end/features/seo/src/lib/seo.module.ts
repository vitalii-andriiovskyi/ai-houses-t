import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { SeoEntity } from './entities/seo.entity';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { ImageModule } from '@be/image';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeoEntity]),
    forwardRef(() => ImageModule),
  ],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService, TypeOrmModule],
})
export class SeoModule {}
