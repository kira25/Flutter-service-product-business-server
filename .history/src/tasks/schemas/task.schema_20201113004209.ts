import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: String,
  description: String,
  done: Boolean,
  userId: String,
  name: String,
  team: [],
});
