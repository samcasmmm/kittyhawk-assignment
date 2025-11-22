import { api } from '@/modules/api';
import { showToast } from '@/modules/toast';
import { getErrorMessage } from '@/utils/common';

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
}

export type UpdateTodoPayload = Partial<CreateTodoPayload>;

const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await api.get('/todos');
    const todos: Todo[] = res.data?.data ?? [];
    return todos;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Failed to load todos', errorMessage);
    throw err;
  }
};

const createTodo = async (payload: CreateTodoPayload): Promise<Todo> => {
  try {
    const res = await api.post('/todos', payload);
    const todo: Todo = res.data?.data;
    showToast('success', 'Todo created');
    return todo;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Failed to create todo', errorMessage);
    throw err;
  }
};

const updateTodo = async (
  id: string,
  updates: UpdateTodoPayload
): Promise<Todo> => {
  try {
    const res = await api.put(`/todos/${id}`, updates);
    const todo: Todo = res.data?.data;
    showToast('success', 'Todo updated');
    return todo;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Failed to update todo', errorMessage);
    throw err;
  }
};

const deleteTodo = async (id: string): Promise<void> => {
  try {
    await api.delete(`/todos/${id}`);
    showToast('success', 'Todo deleted');
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Failed to delete todo', errorMessage);
    throw err;
  }
};

const TodoRepository = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default TodoRepository;
