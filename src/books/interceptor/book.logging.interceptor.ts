import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RESPONSE_STATUS } from '../../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestTime = Date.now();

    const request = context.switchToHttp().getRequest();
    const url = request.url; // URL запроса

    // Если метод handle() не будет вызван, то обработка маршрута выполняться не будет
    return next.handle().pipe(
      map((books) => {
        const hasLength = books && books.length > 0;
        const updatedBooks = hasLength
          ? books.map((book) => {
              return { ...book.toObject(), requestTime: requestTime }; // .toObject() или toJSON() на каждом элементе, чтобы получить "чистые" данные без лишних полей
            })
          : [{ ...books.toObject(), requestTime: requestTime }];
        return {
          status: `${RESPONSE_STATUS.SUCCESS} response from ${url}`,
          data: updatedBooks,
        };
      }),
      catchError((error) => {
        const errorResponse = {
          status: `${RESPONSE_STATUS.FAIL}`,
          data: {
            message: error.message,
            timestamp: new Date().toISOString(),
            path: url,
          },
        };

        return throwError(
          () => new InternalServerErrorException(errorResponse),
        );
      }),
    );
  }
}
