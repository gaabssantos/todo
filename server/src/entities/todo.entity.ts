type TodoProps = {
  todo: string;
  finished: boolean;
};

export class TodoEntity {
  public todo: string;
  public finished: boolean;

  constructor({ todo, finished }: TodoProps) {
    this.todo = todo;
    this.finished = finished;
  }
}
