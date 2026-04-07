import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserSignUpBE } from '@shared';

export class CreateUserDto implements UserSignUpBE {
  // @IsNotEmpty()
  @IsString()
  // @MaxLength(255)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName!: string;

  @IsEmail()
  // @MaxLength(320)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  password!: string;

  @IsBoolean()
  @IsOptional()
  isTemporaryPassword?: boolean;
}
