/* eslint-disable @nx/enforce-module-boundaries */
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { CreateAiHouseDto } from './create-ai-house.dto';
import { UpdateImageDto } from '@be/image/parts';
import { UpdateAddressDto } from '@be/address/parts';
import { UpdateSeoDto } from '@be/seo/parts';
import { Address, SEO, Image } from '@shared';

export class UpdateAiHouseDto extends PartialType(CreateAiHouseDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateImageDto)
  override images!: Image[];

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  override address!: Address;

  @ValidateNested()
  @Type(() => UpdateSeoDto)
  override seo!: SEO;
}
