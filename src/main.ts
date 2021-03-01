import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {
  Logger,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PORT } from './config/configuration';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT || 5000);

  app.use(bodyParser.json({ limit: '5mb' })); //limit request size
  app.use(bodyParser.urlencoded({ limit: ' 5mb', extended: true }));

  app.enableCors({
    allowedHeaders: 'Authorization',
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  Logger.log(`Server started runnig on ${PORT}`);
  console.log(`Server listen on ${PORT}`);
}
bootstrap();
