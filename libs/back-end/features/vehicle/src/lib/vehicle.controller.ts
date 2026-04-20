import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search?: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.vehicleService.paginatePreviews(
      {
        page,
        limit,
      },
      { search },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('isURL') isURL: boolean) {
    if (isURL) {
      return this.vehicleService.findOneByUrl(id);
    }
    return this.vehicleService.findOne(id);
  }
}
