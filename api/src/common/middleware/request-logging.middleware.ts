import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(`📥 ${method} ${originalUrl} - ${ip} - ${userAgent}`);

    // Override res.end to log response
    const originalEnd = res.end.bind(res);
    res.end = (chunk?: any, encoding?: any) => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      // Choose emoji based on status code
      let statusEmoji = '📤';
      if (statusCode >= 200 && statusCode < 300) statusEmoji = '✅';
      else if (statusCode >= 400 && statusCode < 500) statusEmoji = '⚠️';
      else if (statusCode >= 500) statusEmoji = '❌';

      // Log response
      console.log(
        `${statusEmoji} ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );

      // Call original end
      return originalEnd.call(res, chunk, encoding);
    };

    next();
  }
}
