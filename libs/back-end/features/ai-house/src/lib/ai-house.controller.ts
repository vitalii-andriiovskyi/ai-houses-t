import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AiHouseService } from './ai-house.service';
import { CreateAiHouseDto } from './dto/create-ai-house.dto';
import { UpdateAiHouseDto } from './dto/update-ai-house.dto';

@Controller('ai-house')
export class AiHouseController {
  constructor(private readonly aiHouseService: AiHouseService) {}

  @Post()
  create(@Body() createAiHouseDto: CreateAiHouseDto) {
    return this.aiHouseService.create(createAiHouseDto);
  }

  @Get()
  findAll() {
    return this.aiHouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiHouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiHouseDto: UpdateAiHouseDto) {
    return this.aiHouseService.update(+id, updateAiHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiHouseService.remove(+id);
  }
}
