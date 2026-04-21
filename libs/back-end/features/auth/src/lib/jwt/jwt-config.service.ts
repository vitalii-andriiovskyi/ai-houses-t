import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import type { StringValue } from 'ms';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.get<StringValue>('jwt.expiresIn'),
      },
    };
  }
}
