import { Injectable } from '@nestjs/common';
import {
  HelloWorldResponse,
  TestRequest,
  TestResponse,
} from '@modules/main/main.dto';
import { SomeEntity } from '@modules/main/entities/some.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class MainService {
  constructor(
    @InjectEntityManager()
    private readonly man: EntityManager,
  ) {}

  public async getHello(): Promise<HelloWorldResponse> {
    return {
      hello: true,
    };
  }

  public async getTest(body: TestRequest): Promise<TestResponse> {
    return {
      success: body.test,
    };
  }

  public async getSomeEntity(): Promise<SomeEntity> {
    return this.man
      .find(SomeEntity)
      .then((e) => (e.length > 0 ? e[0] : undefined));
  }
}
