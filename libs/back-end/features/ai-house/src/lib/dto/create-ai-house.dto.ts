/* eslint-disable @nx/enforce-module-boundaries */
import { CreateAddressDto } from '@be/address/parts';
import { CreateImageDto } from '@be/image/parts';
import { CreateSeoDto } from '@be/seo/parts';
import { Address, AIHouseCreate, Image, SEO, User } from '@shared';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateAiHouseDto implements AIHouseCreate {
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
  ownerId!: string;

  @IsOptional()
  owner!: User;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  rooms!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  area!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsBoolean()
  available!: boolean;

  @IsNotEmpty()
  @IsDateString()
  builtYear!: Date; // 2023-01-31T22:00:00.000Z

  @IsOptional()
  @IsDateString()
  lastRenovation?: Date;

  @IsNotEmpty()
  @IsString()
  url!: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  features?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateImageDto)
  images!: Image[];

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: Address;

  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo!: SEO;
}
