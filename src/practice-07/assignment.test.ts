import { describe, it, expect } from 'vitest';
import { HomeworkAssignment } from './assignment.js';
import { Task } from './task.js';
import {
  DuplicateTaskError,
  PastDueDateError,
  AlreadySubmittedError,
  NoTasksError,
  TaskNotFoundError,
} from './errors.js';

describe('HomeworkAssignment', () => {
  describe('creation', () => {
    it('should throw an error when created with a past due date', () => {
      const pastDate = new Date('2026-02-01');
      expect(
        () => new HomeworkAssignment('HW-001', 'Math Homework', pastDate)
      ).toThrow(PastDueDateError);
    });
  });

  describe('addTask', () => {
    it('should throw an error when adding a task with a duplicate id', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      expect(() =>
        assignment.addTask(new Task('T-001', 'Solve problem 2'))
      ).toThrow(DuplicateTaskError);
    });

    it('should throw an error when adding a task after submission', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.submit();
      expect(() =>
        assignment.addTask(new Task('T-002', 'Solve problem 2'))
      ).toThrow(AlreadySubmittedError);
    });
  });

  describe('completeTask', () => {
    it('should throw an error when completing a task that does not exist', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      expect(() => assignment.completeTask('T-999')).toThrow(
        TaskNotFoundError
      );
    });

    it('should throw an error when completing a task after submission', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.submit();
      expect(() => assignment.completeTask('T-001')).toThrow(
        AlreadySubmittedError
      );
    });
  });

  describe('submit', () => {
    it('should change status to submitted', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.submit();
      expect(assignment.isSubmitted()).toBe(true);
    });

    it('should allow submission with incomplete tasks', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.addTask(new Task('T-002', 'Solve problem 2'));
      assignment.completeTask('T-001');
      assignment.submit();
      expect(assignment.isSubmitted()).toBe(true);
    });

    it('should throw an error when submitting with no tasks', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      expect(() => assignment.submit()).toThrow(NoTasksError);
    });

    it('should throw an error when submitting an already submitted assignment', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.submit();
      expect(() => assignment.submit()).toThrow(AlreadySubmittedError);
    });
  });

  describe('isOverdue', () => {
    it('should return false when the due date has not passed', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      expect(assignment.isOverdue()).toBe(false);
    });

    it('should return false when submitted before the due date', () => {
      const assignment = new HomeworkAssignment(
        'HW-001',
        'Math Homework',
        new Date('2026-02-28')
      );
      assignment.addTask(new Task('T-001', 'Solve problem 1'));
      assignment.submit();
      expect(assignment.isOverdue()).toBe(false);
    });
  });
});
