/* eslint-disable @nx/enforce-module-boundaries */
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateImageDto } from '@be/image/parts';
import { CreateSeoDto } from '@be/seo/parts';
import { Image, SEO, User } from '@shared';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  url!: string;

  @IsNotEmpty()
  @IsString()
  ownerId!: string;

  @IsOptional()
  owner!: User;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  doors!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  seats!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1900)
  year!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  color!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  model!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsBoolean()
  available!: boolean;

  @ValidateNested()
  @Type(() => CreateImageDto)
  previewImage!: Image;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateImageDto)
  images!: Image[];

  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo!: SEO;
}
