import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Request,
  UseGuards,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AiHouseService } from './ai-house.service';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@be/auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OptionalJwtAuthGuard } from '@be/auth';

/**
 * Public API for AI Houses. Users can view AI Houses preview or an AI House details.
 */
@Controller('ai-houses')
@UseInterceptors(ClassSerializerInterceptor)
export class AiHouseController {
  constructor(private readonly aiHouseService: AiHouseService) {}

  // @Post()
  // create(@Body() createAiHouseDto: CreateAiHouseDto) {
  //   return this.aiHouseService.create(createAiHouseDto);
  // }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(
    @Request() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search?: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.aiHouseService.paginatePreviews(
      {
        page,
        limit,
        // route: '/ai-houses', // for now don't use as when usen search, and other params are present, need to add them manually to routes in the `links` object. I don't use that links object at all.
      },
      { search },
      req.user?.id,
    );
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(
    @Request() req: any,
    @Param('id') id: string,
    @Query('isURL') isURL: boolean,
  ) {
    if (isURL) {
      return this.aiHouseService.findOneByUrl(id, req.user?.id);
    }
    return this.aiHouseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @HttpCode(200)
  like(@Request() req: any, @Param('id') id: string) {
    return this.aiHouseService.like(id, req.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unlike')
  @HttpCode(200)
  unlike(@Request() req: any, @Param('id') id: string) {
    return this.aiHouseService.unlike(id, req.user?.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAiHouseDto: UpdateAiHouseDto) {
  //   return this.aiHouseService.update(id, updateAiHouseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aiHouseService.remove(id);
  // }
}
