export class DuplicateTaskError extends Error {
  constructor(message = 'Task already exists in this assignment') {
    super(message);
  }
}

export class PastDueDateError extends Error {
  constructor(message = 'Assignment is past its due date') {
    super(message);
  }
}

export class AlreadySubmittedError extends Error {
  constructor(message = 'Assignment has already been submitted') {
    super(message);
  }
}

export class NoTasksError extends Error {
  constructor(message = 'Assignment must have at least one task to submit') {
    super(message);
  }
}

export class TaskNotFoundError extends Error {
  constructor(message = 'Task not found in this assignment') {
    super(message);
  }
}

export class TaskAlreadyCompletedError extends Error {
  constructor(message = 'Task has already been completed') {
    super(message);
  }
}