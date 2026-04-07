import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions, RedisOptionsFactory } from '../redis.interfaces';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createRedisOptions(): RedisModuleOptions {
    return {
      url: this.configService.get<string>('db.redis.uri'),
    };
  }
}
