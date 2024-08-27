import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestTime = Date.now();

    const request = context.switchToHttp().getRequest();
    const url = request.url; // URL запроса

    // Если метод handle() не будет вызван, то обработка маршрута выполняться не будет
    return next.handle().pipe(
      map((books) => {
        const updatedBooks = books.map((book) => {
          return { ...book.toObject(), requestTime: requestTime }; // .toObject() или toJSON() на каждом элементе, чтобы получить "чистые" данные без лишних полей
        });
        return {
          status: `success response from ${url}`,
          data: updatedBooks,
        };
      }),
      catchError((error) => {
        const errorResponse = {
          status: 'fail',
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
