import axios from 'axios';
import { TodoType } from './api-types';

const baseUrl = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const createTodo = async (todo: string): Promise<TodoType> => {
  const { data } = await baseUrl.post<TodoType>('/todo', {
    todo,
    finished: false,
  });

  return data;
};

export const deleteTodo = async (todo: string): Promise<TodoType> => {
  const { data } = await baseUrl.delete<TodoType>('/todo', {
    data: { todo },
  });

  return data;
};

export const updateTodo = async (todo: string): Promise<TodoType> => {
  const { data } = await baseUrl.put<TodoType>('/todo', {
    todo,
  });

  return data;
};

export const getAllTodos = async (): Promise<TodoType[]> => {
  const { data } = await baseUrl.get<TodoType[]>('/todo');

  return data;
};
