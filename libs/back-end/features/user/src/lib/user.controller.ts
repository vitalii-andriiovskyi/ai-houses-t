import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UnauthorizedException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { logoutAsync } from '@be/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@be/auth';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUser(@Request() req: any) {
    const sessionEmail: string | null | undefined = req.user?.email;
    if (sessionEmail) {
      const user = await this.userService.findOneByEmail(sessionEmail);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

    throw new UnauthorizedException('Cannot retrieve user information');
    // return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    try {
      await logoutAsync(req);
    } catch (error: any) {
      console.log('AUTHORIZATION ERROR: ', error);
      // throw new InternalServerErrorException(error.message); // Throwing an error is commented out to prevent disruption of the user creation process
    }
    return this.userService.softRemove(id);
  }
}
