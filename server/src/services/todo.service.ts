import { TodoRepository } from '../database/repositories/todo.repository';
import { TodoDTO } from '../dtos/todo.dto';
import { TodoEntity } from '../entities/todo.entity';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  create = async ({ todo, finished }: TodoDTO): Promise<TodoEntity> => {
    const todoCreated = await this.todoRepository.create({ todo, finished });

    return todoCreated;
  };

  index = async (): Promise<TodoEntity[]> => {
    const todos = await this.todoRepository.index();

    return todos;
  };

  delete = async (todo: string) => {
    const todoDeleted = await this.todoRepository.delete(todo);

    return todoDeleted;
  };

  findByName = async (todo: string): Promise<TodoEntity | undefined> => {
    const todoFound = await this.todoRepository.findByName(todo);

    return todoFound;
  };
}
