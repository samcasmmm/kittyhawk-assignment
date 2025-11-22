import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITodo extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
//
const TodoSchema: Schema = new Schema<ITodo>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);
