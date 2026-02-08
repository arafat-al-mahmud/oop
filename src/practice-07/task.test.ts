import { describe, it, expect } from 'vitest';
import { Task } from './task.js';
import { TaskAlreadyCompletedError } from './errors.js';

describe('Task', () => {
  describe('complete', () => {
    it('should mark the task as completed', () => {
      const task = new Task('T-001', 'Solve problem 1');
      task.markComplete();
      expect(task.isComplete()).toBe(true);
    });

    it('should throw an error when completing an already completed task', () => {
      const task = new Task('T-001', 'Solve problem 1');
      task.markComplete();
      expect(() => task.markComplete()).toThrow(TaskAlreadyCompletedError);
    });
  });
});
