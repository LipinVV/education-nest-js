import { Injectable } from '@nestjs/common';
import { catchError, map, of, shareReplay, timeout } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RxjsService {
  constructor(private readonly httpService: HttpService) {}

  async getRepositories(urlPath: string) {
    const repoRequest = this.httpService.get(urlPath).pipe(
      timeout(3000), // если от сервера не поступит ответ в течение указанного времени (например, 3 секунд), то запрос будет прерван, и будет сгенерирована ошибка тайм-аута
      map((response) => response.data.items),
      shareReplay(1), // кэшируем
      catchError((error) => {
        console.error('Error during fetching repositories:', error.message);
        return of([]); // возвращаем пустой массив в случае ошибки
      }),
    );

    return repoRequest;
  }
}
