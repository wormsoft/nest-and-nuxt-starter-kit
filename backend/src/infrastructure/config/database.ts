import { parseDbUrl } from '@common/parse-db-url';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { DatabaseConfig } from '@infrastructure/database/database.config';

export const databaseConfig = (
  config: DatabaseConfig,
): {
  database: DataSourceOptions;
} => {
  if (!config.url) {
    throw new Error('No database url provided');
  }
  const parsedDb = parseDbUrl(config.url);
  const options: DataSourceOptions = {
    type: 'postgres',
    database: parsedDb.database,
    username: parsedDb.user,
    password: parsedDb.password,
    host: parsedDb.host,
    port: parsedDb.port,
    entities: [path.resolve(`${__dirname}/../../**/*.entity.{js,ts}`)],
    migrations: [path.resolve(`${__dirname}/../../migrations/*.{js,ts}`)],
    migrationsRun: parsedDb.query?.runMigrate,
    synchronize: parsedDb.query?.sync,
    logging: parsedDb.query.log,
  };
  return {
    database: options,
  };
};
