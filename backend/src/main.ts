import {NestFactory} from '@nestjs/core';
import * as winston from 'winston';
import {AppModule} from './app.module';
import {ErrorInterceptor} from "./infrastructure/interceptors/error.interceptor";

async function bootstrap() {
    const port = 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new ErrorInterceptor())

    const logger = app.get(winston.Logger);
    logger.info(`Application is running on http://localhost:${port}`);

    await app.listen(port);
}

await bootstrap();
