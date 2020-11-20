import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtModule],
})
export class TasksModule {}
