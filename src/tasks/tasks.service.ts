/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/tasks';
import { User } from '../users/interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TasksService {
  // tasks: Task[]  = [
  //     {id:1, title:"testing", description: "testing description", done:true},
  //     {id:2, title:"testing2", description: "testing description2", done:true},
  //     {id:3, title:"testing3", description: "testing description3", done:true},
  // ]

  // getTasks(){
  //     return this.tasks;
  // }
  // getTask(id:number){
  //     return this.tasks.find(tasks => tasks.id ==id);
  // }

  constructor(
    @InjectModel('task') private taskModel: Model<Task>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getTasks() {
    const tasks = await this.taskModel.find();
    if (tasks.length == 0) return { ok: false, response: 'No tasks' };
    console.log(tasks);
    return { ok: true, tasks };
  }
  async getTask(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) return { ok: false, response: 'No Task found' };
    return {
      ok: true,
      task,
    };
  }

  async createTask(task: CreateTaskDto, data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    const id = user.id;
    task.userId = id;
    task.name = user.firstname;

    const newTask = new this.taskModel(task);
    console.log(newTask);
    return await newTask.save();
  }

  async addTeamMembers(data: any, id) {
    console.log('addTeamMembers');
    const name = data.name;
    const user = await this.userModel.findOne({ firstname: name });
    if (!user) {
      return { ok: false, response: 'No user found' };
    }
    const { firstname, _id } = user;
    const payload = {
      name: firstname,
      memberId: _id,
    };
    const task = await this.taskModel.findById(id);
    if (!task) {
      return { ok: false, response: 'No Task found' };
    }
    task.team.push(payload);
    const memberUpdated = this.taskModel.findOneAndUpdate(id, task, {
      new: true,
    });

    return {
      ok: true,
      memberUpdated,
    };
  }
  // async updateTask(task: CreateTaskDto, id) {
  //   return await this.taskModel.findByIdAndUpdate(id, task);
  // }

  async deleteTask(id, memberId: string) {
    console.log('deleteTask');
    const task = await this.taskModel.findById(id);
    if (!task) {
      return { ok: false, response: 'No Task found' };
    }
    const { team } = task;
    const newTeam = team.filter(team => team.memberId != memberId);
    //TODO: reemplazar el arreglo por el nuevo team
    task.team = newTeam;

    const memberDeleted = await this.taskModel.findOneAndUpdate(id, task, {
      new: true,
    });
    return {
      ok: true,
      memberDeleted,
    };
  }

  async getTaskByUserId(id: string) {
    try {
      const user = await this.userModel.findById(id);
      console.log(user);
      if (!user) return { ok: false, response: 'No user found' };

      const tasksByUserId = await this.taskModel.find({
        name: user.firstname,
      });
      if (!tasksByUserId) return { ok: false, response: 'No tasks' };

      return {
        ok: true,
        tasksByUserId,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error,
      };
    }
  }
}
