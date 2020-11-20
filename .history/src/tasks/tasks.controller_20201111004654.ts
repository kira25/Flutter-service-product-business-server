/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/guards.guard';
import { Roles } from 'src/guards/roles.decorator';
import { ROLE } from 'src/common/enum';
// import {Request, Response} from 'express';

@UsePipes(new ValidationPipe())
@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Roles(ROLE.ADMIN)
  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }
  //CASO UTILICEN EXPRESS
  // getTask(@Req() req,@Res() res) : Response{
  //     return res.send('hello world');
  // }
  @Roles(ROLE.USER)
  @Get(':taskId')
  getTask(@Param('taskId') taskId) {
    return this.taskService.getTask(taskId);
  }

  @Roles(ROLE.SELLER)
  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() task: CreateTaskDto, @Request() resp): Promise<Task> {
    return this.taskService.createTask(task, resp.user);
  }

  @Roles(ROLE.SELLER)
  @Put('/update:id')
  updateTask(@Body() data, @Param('id') id): Promise<Task> {
    console.log('update');
    return this.taskService.addTeamMembers(data, id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
