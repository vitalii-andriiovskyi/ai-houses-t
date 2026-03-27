import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './services/typeorm-config/typeorm-config.service';

@Module({
  controllers: [],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class SharedModule {}
