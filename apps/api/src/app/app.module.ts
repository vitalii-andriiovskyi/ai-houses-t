import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core/constants';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientType } from 'redis';
import { RedisStore } from 'connect-redis';
import session from 'express-session';

import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter, TypeOrmConfigService } from '@be/shared';
import { UserModule } from '@be/user';
import { AiHouseModule } from '@be/ai-house';
import { ImageModule } from '@be/image';
import { AddressModule } from '@be/address';
import { SeoModule } from '@be/seo';
import { AuthModule } from '@be/auth';
import { RedisConfigService, REDIS_CLIENT, RedisModule } from '@be/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      skipProcessEnv: true,
      cache: true,
      // validationSchema: Joi.object({}), // TODO: Add later when go to production
      // validationOptions: {}, // TODO: Add later when go to production
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    RedisModule.registerAsync({
      useClass: RedisConfigService,
      isGlobal: true,
    }),
    UserModule,
    SeoModule,
    AddressModule,
    ImageModule,
    AiHouseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis, prefix: 'sess:' }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
      )
      .forRoutes('*path');
  }
}
