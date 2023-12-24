import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export async function createTestingApp() {
  return (
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
  )
    .createNestApplication()
    .setGlobalPrefix('api');
}
