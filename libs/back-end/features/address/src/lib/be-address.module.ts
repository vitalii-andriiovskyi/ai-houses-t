import { Module } from '@nestjs/common';
import { AddressModule } from './address.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [AddressModule],
})
export class BeAddressModule {}
