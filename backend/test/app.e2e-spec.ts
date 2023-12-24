import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from './utils/create-testing-app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestingApp();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });
});
