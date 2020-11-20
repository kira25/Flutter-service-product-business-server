import { response } from 'express';
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
  Query,
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

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks(): Promise<Task[]> {
    console.log('Get Task');
    return this.taskService.getTasks();
  }
  //CASO UTILICEN EXPRESS
  // getTask(@Req() req,@Res() res) : Response{
  //     return res.send('hello world');
  // }
  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Get('/:_id')
  @UseGuards(JwtAuthGuard)
  async getTask(@Param('_id') _id: string): Promise<Task> {
    console.log('Get Task by Id');
    return this.taskService.getTask(_id);
  }

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Body() task: CreateTaskDto, @Request() resp): Promise<Task> {
    return this.taskService.createTask(task, resp.user);
  }

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateTask(@Body() data: any, @Param('id') id): Promise<any> {
    return response.status(200).json({
      ok: true,
    });
  }

  @Delete(':id')
  deleteTask(@Param('id') id): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
