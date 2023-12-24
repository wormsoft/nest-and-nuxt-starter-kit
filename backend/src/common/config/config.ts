import * as process from 'process';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

const CONFIG_PATH = './deploy/config.yml';

type Config = {
  environment: string;
  app: {
    name: string;
    port: number;
  };
  db: {
    host: string;
    port: number;
  };
} & Record<string, never>;

export default (): Config => {
  const configPath = process.env.CONFIG_PATH || CONFIG_PATH;
  const file = readFileSync(join(configPath), 'utf-8');
  const config = yaml.load(file) as Config;
  config.environment = process.env.NODE_ENV || config.environment;
  config.app.name = process.env.APP_NAME || config.app.name;
  config.app.port = parseInt(process.env.APP_PORT) || config.app.port;
  config.db.host = process.env.DB_HOST || config.db.host;
  config.db.port = parseInt(process.env.DB_PORT) || config.db.port;
  return config;
};
