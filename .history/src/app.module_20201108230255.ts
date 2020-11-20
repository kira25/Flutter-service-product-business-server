import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { DATABASE } from './config/configuration';

@Module({
  imports: [TasksModule, MongooseModule.forRoot(DATABASE), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Los modulos son codigo inicial, cada modulo comprende una parte de la aplicacion total
