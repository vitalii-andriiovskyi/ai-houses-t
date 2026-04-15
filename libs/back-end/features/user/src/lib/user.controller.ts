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
  Headers,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, RolesGuard } from '@be/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@be/auth/jwt-guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService } from '@be/auth';
import { Role } from '@shared';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
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
  async remove(
    @Request() req: any,
    @Headers('authorization') authHeader: string,
    @Param('id') id: string,
  ) {
    try {
      await this.authService.logout(req.logout.bind(req), authHeader);
    } catch (error: any) {
      this.logger.error('AUTHORIZATION ERROR: ', error);
      // throw new InternalServerErrorException(error.message); // Throwing an error is commented out to prevent disruption of the user removal process
    }
    return this.userService.softRemove(id);
  }
}
