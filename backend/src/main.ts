import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as winston from 'winston';

async function bootstrap() {
    const port = 3000;
    const app = await NestFactory.create(AppModule);

    const logger = app.get(winston.Logger);
    logger.info(`Application is running on http://localhost:${port}`);

    await app.listen(port);
}

await bootstrap();
