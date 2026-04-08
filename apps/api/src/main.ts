import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const cors = environment.cors;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': [
            "'self'",
            "'sha256-mYtSGGR8pobG4t4zhuNjnFY4XMb5vChtDqSY1RR/ojs='",
            'www.googletagmanager.com',
            'www.google-analytics.com',
            'ssl.google-analytics.com',
          ],
          // "script-src-elem": ["'self'", "'sha256-mYtSGGR8pobG4t4zhuNjnFY4XMb5vChtDqSY1RR/ojs='", "www.googletagmanager.com",  "www.google-analytics.com", "ssl.google-analytics.com"],
          'img-src': [
            "'self'",
            'data:',
            'www.googletagmanager.com',
            'www.google-analytics.com',
          ],
          'connect-src': ["'self'", 'https://www.google-analytics.com'],
        },
      },
    }),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // not sure as it will transform the payload to the DTO class on every route handler.
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('http.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
