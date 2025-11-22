import { Request, Response } from 'express';
import { TodoModel } from '@/models/todo.model';
import { Types } from 'mongoose';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const todos = await TodoModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();
    res.build.withData(todos).send();
  } catch (err) {
    console.error(err);
    res.build.withStatus(500).withMessage('Server error').withData(err).send();
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { title, description } = req.body;
    if (!title) {
      res.build.withStatus(400).withMessage('Title is required').send();
      return;
    }

    const todo = await TodoModel.create({
      user: new Types.ObjectId(userId),
      title,
      description,
    });
    res.build.withStatus(201).withData(todo).send();
  } catch (err) {
    console.error(err);
    res.build.withStatus(500).withMessage('Server error').withData(err).send();
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const updates = req.body;
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true }
    );
    if (!todo) {
      res.build.withStatus(404).withMessage('Todo not found').send();
      return;
    }
    res.build.withData(todo).send();
  } catch (err) {
    console.error(err);
    res.build.withStatus(500).withMessage('Server error').withData(err).send();
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const todo = await TodoModel.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
      res.build.withStatus(404).withMessage('Todo not found').send();
      return;
    }
    res.build.withMessage('Todo deleted successfully').send();
  } catch (err) {
    console.error(err);
    res.build.withStatus(500).withMessage('Server error').withData(err).send();
  }
};
