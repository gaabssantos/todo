import { TodoEntity } from '../../entities/todo.entity';
import { TodoModel } from '../schemas/todo.schema';

export class TodoRepository {
  constructor(private todoModel: typeof TodoModel) {}

  create = async ({ todo, finished }: TodoEntity): Promise<TodoEntity> => {
    const todoCreated = await this.todoModel.create({ todo, finished });

    return todoCreated.toObject<TodoEntity>();
  };

  index = async (): Promise<TodoEntity[]> => {
    const todos = await this.todoModel.find();

    const todosMap = todos.map((todo) => todo.toObject<TodoEntity>());

    return todosMap;
  };

  delete = async (todo: string): Promise<TodoEntity | undefined> => {
    const todoDeleted = await this.todoModel.findOneAndDelete({ todo });

    return todoDeleted?.toObject<TodoEntity>();
  };

  findByName = async (todo: string): Promise<TodoEntity | undefined> => {
    const todoFound = await this.todoModel.findOne({ todo });

    return todoFound?.toObject<TodoEntity>();
  };
}
