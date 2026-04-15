import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  address1!: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  // it would be good to make it optional or isnotempty for US
  @ValidateIf((o) => o.country === 'US')
  @IsNotEmpty({ message: 'State is required for the US' })
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  zip!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsOptional()
  @IsString()
  apt?: string;
}
