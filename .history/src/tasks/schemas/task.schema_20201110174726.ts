import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: String,
  description: String,
  done: Boolean,
  assigned: String,
  team: [
    {
      name: String,
      memberId: String,
    },
  ],
});
