import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AiHouseService } from './ai-house.service';
import { CreateAiHouseDto } from './dto/create-ai-house.dto';
import { UpdateAiHouseDto } from './dto/update-ai-house.dto';
import { Role } from '@shared';
import { Roles, RolesGuard } from '@be/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@be/auth';

@Controller('admin/ai-houses')
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class AiHouseAdminController {
  constructor(private readonly aiHouseService: AiHouseService) {}

  @Post()
  create(@Body() createAiHouseDto: CreateAiHouseDto) {
    return this.aiHouseService.create(createAiHouseDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search?: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.aiHouseService.paginate(
      {
        page,
        limit,
        // route: '/admin/ai-houses', // for now don't use as when usen search, and other params are present, need to add them manually to routes in the `links` object. I don't use that links object at all.
      },
      { search },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiHouseService.findOne(id);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() updateAiHouseDto: UpdateAiHouseDto) {
    return this.aiHouseService.update(id, updateAiHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiHouseService.remove(id);
  }
}
