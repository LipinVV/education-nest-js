import { Injectable } from '@nestjs/common';
import { catchError, map, of, shareReplay, timeout } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { BASIC_TIMEOUT } from '../constants';

@Injectable()
export class RxjsService {
  constructor(private readonly httpService: HttpService) {}

  async fetchRepositories(urlPath: string) {
    const repoRequest = this.httpService.get(urlPath).pipe(
      timeout(BASIC_TIMEOUT), // если от сервера не поступит ответ в течение указанного времени (например, 3 секунд),
      // то запрос будет прерван, и сгенерируется ошибка тайм-аута: Error during fetching repositories: Timeout has occurred
      map((response) => {
        const optionalResponse = urlPath.includes('gitlab')
          ? response.data
          : response.data.items;

        return optionalResponse;
      }),
      shareReplay(1), // кэшируем
      catchError((error) => {
        console.error('Error during fetching repositories:', error.message);
        return of([]); // возвращаем пустой массив в случае ошибки
      }),
    );

    return repoRequest;
  }
}
