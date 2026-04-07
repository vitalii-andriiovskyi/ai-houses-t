import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto, UserEntity, UserService } from '@be/user';
import { UserSignUpResponse } from '@shared';
import { logoutAsync } from '@be/shared';
import { RedisService } from '@be/redis';

@Injectable()
export class AuthService {
  blacklistKeyPrefix = 'blacklist_';
  blacklisted = 'blacklisted';
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userService.findOneByEmail(email, {
      withPassword: true,
    });
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

  async logout(req: any, authHeader: string) {
    const token = authHeader?.split(' ')[1];
    try {
      await logoutAsync(req);
      await this.invalidateToken(token);
    } catch (error: any) {
      console.log('AUTHORIZATION ERROR: ', error);
      throw new InternalServerErrorException(error.message); // Throwing an error is commented out to prevent disruption of the user creation process
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
}
