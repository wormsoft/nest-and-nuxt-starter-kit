import {Module} from '@nestjs/common';
import LoggerProvider from './infrastructure/logging/logging';

@Module({
    controllers: [],
    providers: [LoggerProvider],
})
export class AppModule {
}
