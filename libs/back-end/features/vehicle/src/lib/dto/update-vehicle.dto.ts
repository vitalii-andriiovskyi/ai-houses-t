import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateImageDto } from '@be/image/parts';
import { UpdateSeoDto } from '@be/seo/parts';
import { Image, SEO } from '@shared';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ValidateNested()
  @Type(() => UpdateImageDto)
  override previewImage!: Image;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateImageDto)
  override images!: Image[];

  @ValidateNested()
  @Type(() => UpdateSeoDto)
  override seo!: SEO;
}
