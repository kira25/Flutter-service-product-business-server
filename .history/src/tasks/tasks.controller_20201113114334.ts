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

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getTasks() {
    console.log('Get Task');
    const tasks = await this.taskService.getTasks();
    return tasks;
  }
  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Get('/userTask/:userId')
  @UseGuards(JwtAuthGuard)
  async getTaskByUserId(@Param('userId') userId: string) {
    // const tasksByUserId = await this.getTaskByUserId(userId);
    // return tasksByUserId;
    return { ok: false };
  }
  //CASO UTILICEN EXPRESS
  // getTask(@Req() req,@Res() res) : Response{
  //     return res.send('hello world');
  // }
  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Get('/:_id')
  @UseGuards(JwtAuthGuard)
  async getTask(@Param('_id') _id: string) {
    console.log('Get Task by Id');
    const TaskId = await this.taskService.getTask(_id);
    return TaskId;
  }

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Body() task: CreateTaskDto, @Request() resp): Promise<Task> {
    return this.taskService.createTask(task, resp.user);
  }

  @Roles(ROLE.ADMIN, ROLE.USER, ROLE.SELLER)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(@Body() data: any, @Param('id') id: string): Promise<any> {
    const updateMember = this.taskService.addTeamMembers(data, id);
    return updateMember;
  }

  @Delete(':id/:memberId')
  deleteTask(@Param('id') id: string, @Param('memberId') memberId: string) {
    const memberDeleted = this.taskService.deleteTask(id, memberId);

    return memberDeleted;
  }
}
