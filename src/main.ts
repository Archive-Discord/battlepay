import { NestFactory } from '@nestjs/core';
import { config } from 'config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080'
    ],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(config.PORT);
}
bootstrap();
