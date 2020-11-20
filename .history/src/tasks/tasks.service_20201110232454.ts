/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/tasks';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  constructor(@InjectModel('task') private taskModel: Model<Task>) {}

  async getTasks() {
    return await this.taskModel.find();
  }
  async getTask(id) {
    return await this.taskModel.findById(id);
  }

  async createTask(task: CreateTaskDto, data: any) {
    const newTask = new this.taskModel(task);
    return await newTask.save();
    console.log(newTask);
  }

  // async updateTask(task: CreateTaskDto, id) {
  //   return await this.taskModel.findByIdAndUpdate(id, task);
  // }

  async deleteTask(id) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
