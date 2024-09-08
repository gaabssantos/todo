import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema(
  {
    todo: String,
    finished: Boolean,
  },
  { versionKey: false },
);

export const TodoModel = mongoose.model('Todos', TodoSchema);
