import { PartialType } from '@nestjs/mapped-types';
import { CreateAiHouseDto } from './create-ai-house.dto';

export class UpdateAiHouseDto extends PartialType(CreateAiHouseDto) {}
