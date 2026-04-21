import { RedisClientOptions } from 'redis';

/**
 * @publicApi
 */
export type RedisModuleOptions = {} & Partial<RedisClientOptions>;

/**
 * @publicApi
 */
export interface RedisOptionsFactory {
  createRedisOptions(
    connectionName?: string,
  ): Promise<RedisModuleOptions> | RedisModuleOptions;
}
