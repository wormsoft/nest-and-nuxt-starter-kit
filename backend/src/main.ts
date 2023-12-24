import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@infrastructure/logging/provider';
import getConfig from '@common/config/config';
import { ErrorInterceptor } from '@infrastructure/interceptors/error.interceptor';

async function bootstrap(): Promise<void> {
  const config = getConfig();
  const logger = createLogger(config.app.name, config.environment);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  const port = config.app.port;

  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();

  logger.info(`Application is running on http://localhost:${port}`);
  await app.listen(port);
}

bootstrap().then(() => {});
