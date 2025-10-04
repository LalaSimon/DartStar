import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enable CORS
  app.enableCors();

  // Apply request logging middleware
  app.use(new RequestLoggingMiddleware().use.bind(new RequestLoggingMiddleware()));

  // Set global prefix
  app.setGlobalPrefix('api');

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable graceful shutdown
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('DartStar API')
    .setDescription('API for DartStar application')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(
    `📚 Swagger docs available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap();
