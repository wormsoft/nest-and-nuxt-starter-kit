import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import DoesNotExistsError from '@domain/errors/does-not-exists.error';
import AlreadyExistsError from '@domain/errors/already-exists.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        const msg = { message: err.message };

        if (err instanceof DoesNotExistsError) {
          return throwError(() => new HttpException(msg, HttpStatus.NOT_FOUND));
        } else if (err instanceof AlreadyExistsError) {
          return throwError(() => new HttpException(msg, HttpStatus.CONFLICT));
        }

        return throwError(
          () => new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }
}
