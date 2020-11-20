import { Task } from './interfaces/tasks';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import {Request, Response} from 'express';
// @UseGuards(JwtAuthGuard)
@UseGuards()
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }
  //CASO UTILICEN EXPRESS
  // getTask(@Req() req,@Res() res) : Response{
  //     return res.send('hello world');
  // }

  @Get(':taskId')
  getTask(@Param('taskId') taskId) {
    return this.taskService.getTask(taskId);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }
  @Put(':id')
  updateTask(@Body() task: CreateTaskDto, @Param('id') id): Promise<Task> {
    return this.taskService.updateTask(task, id);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
