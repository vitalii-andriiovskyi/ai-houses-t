/* eslint-disable @nx/enforce-module-boundaries */
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSeoDto } from './create-seo.dto';
import { CreateImageDto, UpdateImageDto } from '@be/image/parts';

export class UpdateSeoDto extends PartialType(CreateSeoDto) {
  @IsOptional()
  @IsString()
  id!: string;

  @ValidateNested()
  @Type(() => UpdateImageDto)
  override image!: CreateImageDto;
}
