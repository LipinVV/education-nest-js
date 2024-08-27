import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('A new request');
    const requestTime = Date.now();

    // Если метод handle() не будет вызван, то обработка маршрута выполняться не будет
    return next.handle().pipe(
      tap((books) => {
        console.log('\nSuccessful request');
        const updatedBooks = books.map((book) => {
          return { ...book, requestTime: requestTime };
        });
        console.log('updatedBooks', updatedBooks);
      }),
      catchError((error) => {
        console.log('\nFailed request');
        console.log(`\nExecution time: ${Date.now() - requestTime}ms`);
        console.log('\nError message: ', error);
        return throwError(new InternalServerErrorException());
      }),
    );
  }
}
