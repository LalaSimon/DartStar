import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Business');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;

    const startTime = Date.now();

    this.logger.log(
      `🎯 ${controllerName}.${handlerName} - ${method} ${originalUrl}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.log(
          `✅ ${controllerName}.${handlerName} completed - ${duration}ms`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        this.logger.error(
          `❌ ${controllerName}.${handlerName} failed - ${duration}ms - ${error.message}`,
          error.stack,
        );
        return throwError(() => error);
      }),
    );
  }
}
