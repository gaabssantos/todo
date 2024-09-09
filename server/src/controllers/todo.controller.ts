import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { StatusCodes } from "http-status-codes";

export class TodoController {
  constructor(private todoService: TodoService) {}

  create = async (req: Request, res: Response) => {
    const { todo, finished } = req.body;

    const todoFound = await this.todoService.findByName(todo);

    if (todoFound) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ err: "todo_already_exists" });
    }

    const todoCreated = await this.todoService.create({ todo, finished });

    return res.status(StatusCodes.CREATED).json(todoCreated);
  };

  delete = async (req: Request, res: Response) => {
    const { todo } = req.body;

    const todoFound = await this.todoService.findByName(todo);

    if (!todoFound) {
      return res.status(StatusCodes.OK).json({ err: "todo_not_exists" });
    }

    const todoDeleted = await this.todoService.delete(todo);

    return res.status(StatusCodes.OK).json(todoDeleted);
  };

  update = async (req: Request, res: Response) => {
    const { todo } = req.body;

    const todoFound = await this.todoService.findByName(todo);

    if (!todoFound) {
      return res.status(StatusCodes.OK).json({ err: "todo_not_exists" });
    }

    const todoUpdated = await this.todoService.update(
      todo,
      !todoFound?.finished
    );

    return res.status(StatusCodes.OK).json(todoUpdated);
  };

  index = async (_: Request, res: Response) => {
    const todos = await this.todoService.index();

    return res.status(StatusCodes.OK).json(todos);
  };
}
