import {
  AlreadySubmittedError,
  DuplicateTaskError,
  NoTasksError,
  PastDueDateError,
  TaskNotFoundError,
} from './errors.js';
import { Task } from './task.js';

export class HomeworkAssignment {
  private readonly id: string;
  private title: string;
  private dueDate: Date;
  private tasks: Task[];
  private submitted: boolean;

  constructor(id: string, title: string, dueDate: Date) {
    this.id = id;
    this.title = title;

    if (!this.isValidDueDate(dueDate)) {
      throw new PastDueDateError();
    }

    this.dueDate = dueDate;
    this.tasks = [];
    this.submitted = false;
  }

  private isValidDueDate(dueDate: Date) {
    return dueDate > new Date();
  }

  private getTaskById(taskId: string) {
    return this.tasks.find((task) => task.getId() === taskId);
  }

  private isTaskDuplicate(task: Task) {
    const existingTask = this.getTaskById(task.getId());
    return !!existingTask;
  }

  public isSubmitted() {
    return this.submitted;
  }

  public addTask(task: Task) {
    if (this.isSubmitted()) {
      throw new AlreadySubmittedError();
    }

    if (this.isTaskDuplicate(task)) {
      throw new DuplicateTaskError();
    }

    this.tasks.push(task);
  }

  public completeTask(taskId: string) {
    if (this.isSubmitted()) {
      throw new AlreadySubmittedError();
    }

    const task = this.getTaskById(taskId);

    if (!task) {
      throw new TaskNotFoundError();
    }

    task.markComplete();
  }

  public submit() {
    if (this.isSubmitted()) {
      throw new AlreadySubmittedError();
    }

    if (this.tasks.length === 0) {
      throw new NoTasksError();
    }

    this.submitted = true;
  }

  public isOverdue() {
    return new Date() > this.dueDate;
  }
}
