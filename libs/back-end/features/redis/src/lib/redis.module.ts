import {
  DynamicModule,
  Logger,
  Module,
  OnApplicationShutdown,
  Type,
} from '@nestjs/common';
import { defer, lastValueFrom } from 'rxjs';
import { ModuleRef } from '@nestjs/core';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';

import { REDIS_CLIENT } from './redis.constants';
import { RedisModuleOptions } from './redis.interfaces';
import { RedisService } from './redis.service';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} from './redis.module-definition';

/**
 * To use redis client in other modules, inject it using `@Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType` and make sure to import `RedisModule.registerAsync(...)` in that module.
 *
 * OR import `RedisService`. By default RedisModule is global, so you can inject RedisService in any module without importing RedisModule.
 */
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  private readonly logger = new Logger('RedisModule');
  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const result = super.register(options);
    const redisClientProvider = {
      provide: REDIS_CLIENT,
      useFactory: async () => await this.createRedisClientFactory(options),
    };

    return {
      ...result,
      providers: [...(result.providers || []), redisClientProvider],
      exports: [...(result.exports || []), redisClientProvider],
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const result = super.registerAsync(options);
    const redisClientProvider = {
      provide: REDIS_CLIENT,
      useFactory: async (redisClientOptions: RedisClientOptions) => {
        return await this.createRedisClientFactory(redisClientOptions);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    };

    return {
      ...result,
      imports: [...(result.imports || [])],
      providers: [...(result.providers || []), redisClientProvider],
      exports: [...(result.exports || []), redisClientProvider],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const redisClient = this.moduleRef.get<RedisClientType>(
      REDIS_CLIENT as unknown as Type<RedisClientType>,
    );
    try {
      if (redisClient) {
        redisClient.destroy();
      }
    } catch (e: any) {
      this.logger.error(e?.message);
    }
  }

  /**
   * Creates a Redis client using the provided options and client factory.
   * If no client factory is provided, it defaults to using `createClient` from the `redis` package.
   * It's invoked when the module is registered using `registerAsync` or `register` and the Redis client provider is being created.
   *
   * @param options - The options to create the Redis client with.
   * @param clientFactory - An optional factory function to create the Redis client.
   * @returns A promise that resolves to the created Redis client.
   */
  private static async createRedisClientFactory(
    options: RedisModuleOptions,
  ): Promise<RedisClientType> {
    const createRedisClient = (options: RedisClientOptions) =>
      createClient(options);
    return await lastValueFrom(
      defer(async () => {
        const redisClient = createRedisClient(options as RedisClientOptions);

        redisClient
          .on('connect', () => console.log('Redis Client Connecting'))
          .on('ready', () => console.log('Redis Client Ready'))
          .on('error', (err) => console.error('Redis Client Error', err))
          .connect();

        return redisClient as RedisClientType;
      }),
    );
  }
}
