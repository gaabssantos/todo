import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { TodoModel } from '../database/schemas/todo.schema';
import { TodoRepository } from '../database/repositories/todo.repository';

export const todoRoute = Router();

const todoRepository = new TodoRepository(TodoModel);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

todoRoute.post('/', todoController.create);
todoRoute.get('/', todoController.index);
todoRoute.put('/', todoController.update);
todoRoute.delete('/', todoController.delete);
