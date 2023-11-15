import {Provider, Scope} from '@nestjs/common';
import * as winston from 'winston';

const LoggerProvider: Provider = {
    provide: winston.Logger,
    useValue: winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {service: 'nest-backend'},
        transports: [
            new winston.transports.Console(),
        ]
    }),
    scope: Scope.DEFAULT,
};

export default LoggerProvider;
