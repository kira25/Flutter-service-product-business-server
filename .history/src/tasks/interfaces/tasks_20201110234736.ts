import { Document } from 'mongoose';

export interface Task extends Document {
   id?: number;
   title: string;
   description: string;
   done: boolean;
   userId: string;
   name: string
   team: [];
}
//Para manejo interno del proyecto
