import {CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, Observable, throwError} from "rxjs";
import {ArgumentError} from "../../domain/errors/argument.error";
import {UserAlreadyExistsError} from "../../domain/errors/user-already-exists.error";
import {UserDoesNotExistsError} from "../../domain/errors/user-does-not-exists.error";


@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    const msg = {message: err.message};

                    if (err instanceof ArgumentError) {
                        return throwError(() => new HttpException(msg, HttpStatus.BAD_REQUEST));
                    } else if (err instanceof UserAlreadyExistsError) {
                        return throwError(() => new HttpException(msg, HttpStatus.CONFLICT));
                    } else if (err instanceof UserDoesNotExistsError) {
                        return throwError(() => new HttpException(msg, HttpStatus.NOT_FOUND));
                    }

                    return throwError(() => new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR));
                })
            );
    }
}
