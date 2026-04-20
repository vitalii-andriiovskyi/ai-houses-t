/* eslint-disable @nx/enforce-module-boundaries */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleAdminController } from './vehicle-admin.controller';
import { ImageModule } from '@be/image';
import { SeoModule } from '@be/seo';
import { AuthModule } from '@be/auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    forwardRef(() => ImageModule),
    forwardRef(() => SeoModule),
    AuthModule,
  ],
  controllers: [VehicleController, VehicleAdminController],
  providers: [VehicleService],
  exports: [VehicleService, TypeOrmModule],
})
export class VehicleModule {}
