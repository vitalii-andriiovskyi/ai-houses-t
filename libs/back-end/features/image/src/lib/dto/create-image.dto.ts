import { ImageType } from '@shared';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  src!: string;

  @IsNotEmpty()
  @IsString()
  alt!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsNotEmpty()
  @IsEnum(ImageType)
  type!: ImageType;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
