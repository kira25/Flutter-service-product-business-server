import { Document } from 'mongoose';

export interface Task extends Document {
  task: any[];
  id?: number;
  title: string;
  description: string;
  done: boolean;
  userId: string;
  name: string;
  team: any[];
}
//Para manejo interno del proyecto
