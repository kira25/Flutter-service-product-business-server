import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { JwtService, JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TasksService, JwtService, JwtModule],
})
export class TasksModule {}
