import { TaskAlreadyCompletedError } from './errors.js';

export class Task {
  private readonly id: string;
  private title: string;
  private completed: boolean;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  public getId() {
    return this.id;
  }

  public isComplete() {
    return this.completed;
  }

  public markComplete() {
    if (this.isComplete()) {
      throw new TaskAlreadyCompletedError();
    }
    this.completed = true;
  }
}
