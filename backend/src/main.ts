import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3001;
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(port);
}
bootstrap();
