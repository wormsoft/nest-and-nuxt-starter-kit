import { parseDbUrl } from '@common/parse-db-url';

describe('db url parsing', () => {
  it('should parse db url with query string', async () => {
    expect(
      parseDbUrl('postgres://root:password@localhost:5432/database?sync=1'),
    ).toEqual({
      query: {
        sync: true,
        runMigrate: false,
      },
      driver: 'postgres',
      user: 'root',
      password: 'password',
      host: 'localhost',
      port: 5432,
      database: 'database',
    });
    expect(
      parseDbUrl(
        'postgres://root:password@localhost:5432/database?runMigrate=1',
      ),
    ).toEqual({
      query: {
        sync: false,
        runMigrate: true,
      },
      driver: 'postgres',
      user: 'root',
      password: 'password',
      host: 'localhost',
      port: 5432,
      database: 'database',
    });
  });
});
