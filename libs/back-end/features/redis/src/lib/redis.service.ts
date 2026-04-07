import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType, SetOptions } from 'redis';

import { REDIS_CLIENT } from './redis.constants';
import { MODULE_OPTIONS_TOKEN } from './redis.module-definition';
import { RedisModuleOptions } from './redis.interfaces';

@Injectable()
export class RedisService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: RedisModuleOptions,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
  ) {}

  // Set String value for given key
  // Note expires time will be in seconds
  public async setString(
    key: string,
    value: string,
    expires = 0,
    database?: number,
  ) {
    if (database) {
      this.redisClient.select(database);
    }
    const options: SetOptions = {};
    if (expires !== 0) {
      options.expiration = {
        type: 'EX',
        value: expires * 1,
      };
    }
    return this.redisClient.set(key, value, options);
  }

  // Get String value for given key
  public async getString(key: string, database?: number) {
    if (database) {
      this.redisClient.select(database);
    }
    return this.redisClient.get(key);
  }

  // Check if given key exists
  public async hasString(key: string, database?: number) {
    if (database) {
      this.redisClient.select(database);
    }
    return this.redisClient.exists(key);
  }

  // Delete given key from Redis cache
  public async deleteKey(key: string, database?: number) {
    if (database) {
      this.redisClient.select(database);
    } else {
      this.redisClient.select(0);
    }
    return this.redisClient.del(key);
  }

  // Get All KEYS
  public async getAllKeys(database?: number) {
    if (database) {
      this.redisClient.select(database);
    }
    return this.redisClient.keys('*');
  }

  async hashSet(key: string, field: string, values: any, database?: number) {
    if (database) {
      this.redisClient.select(database);
    }
    return this.redisClient.hSet(key, field, values);
  }
  async hashGet(key: string, field: string, database?: number) {
    if (database) {
      this.redisClient.select(database);
    }
    return this.redisClient.hGet(key, field);
  }
}
