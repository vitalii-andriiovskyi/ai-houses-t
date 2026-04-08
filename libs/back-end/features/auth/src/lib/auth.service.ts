import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto, UserEntity, UserService } from '@be/user';
import { Role, UserSignUpResponse } from '@shared';
import { RedisService } from '@be/redis';

@Injectable()
export class AuthService {
  blacklistKeyPrefix = 'blacklist_';
  blacklisted = 'blacklisted';
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    role?: Role,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findOneByEmail(email, {
      withPassword: true,
    });
    if (user && role === Role.Admin && !this.userService.isAdmin(user)) {
      throw new UnauthorizedException('User is not an admin');
    }

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result as UserEntity;
    }
    return null;
  }

  login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const { exp } = this.jwtService.decode(token);
    return {
      access_token: token,
      expires_in: exp || 0,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserSignUpResponse> {
    const user = await this.userService.register(createUserDto);
    const login = this.login(user);
    return { user, ...login };
  }

  async logout(logout: any, authHeader: string) {
    const token = this.extractToken(authHeader);

    try {
      await this.reqLogoutAsync(logout);
      if (token) {
        await this.invalidateToken(token);
      } else {
        this.logger.warn('No token provided for logout');
        // return; // do not return as the session will be canceled and token will be removed on the client side.
      }
    } catch (error: any) {
      this.logger.error('AUTHORIZATION LOGOUT ERROR: ', error);
      throw new InternalServerErrorException(
        'Something went wrong during logout',
      );
    }
  }

  async invalidateToken(token: string): Promise<void> {
    const { exp } = this.jwtService.decode(token);
    const key = `${this.blacklistKeyPrefix}${token}`;
    const exp_in = exp ? exp - Math.floor(Date.now() / 1000) : 0;
    if (exp_in <= 0) {
      return; // Token is already expired, no need to blacklist
    }
    await this.redisService.setString(key, this.blacklisted, exp_in);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const key = `${this.blacklistKeyPrefix}${token}`;
    const result = await this.redisService.getString(key);
    return result === this.blacklisted;
  }

  private reqLogoutAsync(logout: any) {
    return new Promise((resolve, reject) => {
      // Original callback-based function
      logout((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      });
    });
  }

  private extractToken(authHeader: string): string | undefined {
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
