import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core/constants';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter, TypeOrmConfigService } from '@be/shared';

import configuration from '../config/configuration';

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
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    AppService,
    {
      provide: APP_FILTER, useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD, useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
