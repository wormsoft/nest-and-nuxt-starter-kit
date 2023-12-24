import winston from 'winston';
import { utilities } from 'nest-winston';

export const createLogger = (
  app: string = 'backend',
  env: string = 'local',
): winston.Logger => {
  let format = winston.format.combine(
    utilities.format.nestLike(app, {
      colors: true,
      prettyPrint: true,
    }),
    winston.format.timestamp(),
  );

  if (env === 'production' || env === 'staging') {
    format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    );
  }

  return winston.createLogger({
    level: 'info',
    format: format,
    defaultMeta: {
      service: app,
      env: env,
    },
    transports: [new winston.transports.Console()],
  });
};
