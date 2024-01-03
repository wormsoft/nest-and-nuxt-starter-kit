import { DataSource } from 'typeorm';
import { databaseConfig } from '@infrastructure/config/database';
import { DatabaseConfig } from '@infrastructure/database/database.config';

const datasource = new DataSource(
  databaseConfig(new DatabaseConfig()).database,
);
datasource.initialize();
export default datasource;
