import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // Искусственно вызываем исключение для демонстрации
    // throw new HttpException(
    //   { message: 'Forbidden', code: 1001 },
    //   HttpStatus.FORBIDDEN,
    // );

    return this.appService.getHello();
  }
}
