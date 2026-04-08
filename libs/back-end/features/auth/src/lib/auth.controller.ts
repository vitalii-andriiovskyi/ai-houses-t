import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Headers,
  Query,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AuthService } from './auth.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto } from '@be/user';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Role } from '@shared';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() { email, password }: CredentialsDto,
    @Query('role') role?: Role,
  ) {
    const user = await this.authService.validateUser(email, password, role);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async logout(
    @Request() req: any,
    @Headers('authorization') authHeader: string,
  ) {
    await this.authService.logout(req.logout.bind(req), authHeader);
    return { message: 'Logged out successfully' };
  }
}
