// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateImageDto } from '@be/image/parts';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSeoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  headline!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  url?: string;

  @ValidateNested()
  @Type(() => CreateImageDto)
  image!: CreateImageDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}
