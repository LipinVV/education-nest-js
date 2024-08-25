import { Controller, Get, Query } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { gitHubApiUrl, gitLabApiUrl } from '../constants';

@Controller('rxjs')
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  // API возвращает данные в виде единого ответа, а не потока данных.
  // с потоковыми данными, например, через WebSocket или аналогичный протокол,
  // то можно было бы использовать take(10) для ограничения количества эмиссий от источника данных,
  // но в случае HTTP-запроса на API это не применимо, поскольку данные приходят в виде полного ответа.

  // обращаемся к одному методу, в нём следим за тем, github это или gitlab
  @Get('github')
  public async getGitHubRepositories(@Query('q') query: string) {
    const url = `${gitHubApiUrl}${query}`;
    return this.rxjsService.fetchRepositories(url);
  }

  @Get('gitlab')
  public async getGitLabProjects(@Query('q') query: string) {
    const url = `${gitLabApiUrl}${query}`;
    return this.rxjsService.fetchRepositories(url);
  }

  // наверное, можно ещё лучше упростить
}
