import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

import { Credentials } from '@shared';

export class CredentialsDto implements Credentials {
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @IsString()
  @MaxLength(32)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
