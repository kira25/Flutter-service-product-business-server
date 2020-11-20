import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.use(bodyParser.json({ limit: '5mb' })); //limit request size
  app.use(bodyParser.urlencoded({ limit: ' 5mb', extended: true }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  // Logger.log(`Server started runnig on ${}`);
}
bootstrap();
