import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Roles, RolesGuard } from '@be/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@be/auth/jwt-guard';
import { Role } from '@shared';

@Controller('admin/users')
@UseInterceptors(ClassSerializerInterceptor)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class AdminUsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUsers(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    console.log('page', page);
    console.log('pageSize', pageSize);
    // TODO: Implement pagination in the service layer and return paginated results
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
}
