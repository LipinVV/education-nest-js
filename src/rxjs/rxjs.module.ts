import { Module } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { RxjsController } from './rxjs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], //нужно импортировать HttpModule в модуль, где зарегистрирован сервис.
  controllers: [RxjsController],
  providers: [RxjsService],
  exports: [RxjsService],
})
export class RxjsModule {}
