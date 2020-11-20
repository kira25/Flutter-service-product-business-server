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
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  app.use(bodyParser.json({ limit: '5mb' })); //limit request size
  app.use(bodyParser.urlencoded({ limit: ' 5mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (error: ValidationError[]) => {
        console.log(error);
        return new HttpException(
          {
            status: 0,
            errorCode: 999,
            message: Object.values(error[0].constraints)[0],
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  Logger.log(`Server started runnig on ${PORT}`);
}
bootstrap();
