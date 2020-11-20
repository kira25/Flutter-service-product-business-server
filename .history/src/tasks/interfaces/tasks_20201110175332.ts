import { Document } from 'mongoose';

export interface Task extends Document {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly done: boolean;
  readonly userId: string;
  readonly team: [];
}
//Para manejo interno del proyecto
