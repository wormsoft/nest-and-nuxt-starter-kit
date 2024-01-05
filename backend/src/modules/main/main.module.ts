import { Module } from '@nestjs/common';
import { MainController } from '@modules/main/main.controller';
import { MainService } from '@modules/main/main.service';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
