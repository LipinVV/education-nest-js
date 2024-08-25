import { Controller, Get, Query } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('rxjs')
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get()
  public async getRepositories(@Query('q') query: string) {
    // API GitHub возвращает данные в виде единого ответа, а не потока данных.
    // с потоковыми данными, например, через WebSocket или аналогичный протокол, то можно было бы использовать take(10) для ограничения количества эмиссий от источника данных,
    // но в случае HTTP-запроса на GitHub API это не применимо, поскольку данные приходят в виде полного ответа.
    const url = `https://api.github.com/search/repositories?q=${query}`;
    return this.rxjsService.getRepositories(url);
  }
}
