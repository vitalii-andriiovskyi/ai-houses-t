import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// TODO: change (extend) UpdateUserDto later. User has more fields that basic info while signing up. So need proper handling
export class UpdateUserDto extends PartialType(CreateUserDto) { }
