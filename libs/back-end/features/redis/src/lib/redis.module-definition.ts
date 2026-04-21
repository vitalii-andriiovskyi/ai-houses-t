import { ConfigurableModuleBuilder } from '@nestjs/common';

import { RedisModuleOptions } from './redis.interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RedisModuleOptions>()
  .setFactoryMethodName('createRedisOptions')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
