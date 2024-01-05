import { Body, Controller, Get } from '@nestjs/common';
import { MainService } from '@modules/main/main.service';
import {
  HelloWorldResponse,
  TestRequest,
  TestResponse,
} from '@modules/main/main.dto';
import { SomeEntity } from '@modules/main/entities/some.entity';

@Controller()
export class MainController {
  constructor(private readonly service: MainService) {}

  @Get()
  getHello(): Promise<HelloWorldResponse> {
    return this.service.getHello();
  }

  @Get('/test')
  test(@Body() body: TestRequest): Promise<TestResponse> {
    return this.service.getTest(body);
  }

  @Get('/some')
  some(): Promise<SomeEntity> {
    return this.service.getSomeEntity();
  }
}
