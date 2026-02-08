import { describe, it, expect } from 'vitest';
import { Movie } from './movie.js';
import { MovieNotWatchedError, InvalidRatingError } from './errors.js';

describe('Movie', () => {
  describe('rate', () => {
    it('should throw an error when rating a movie that has not been watched', () => {
      const movie = new Movie('MOV-001', 'The Godfather');
      expect(() => movie.rate(5)).toThrow(MovieNotWatchedError);
    });

    it('should throw an error when rating below 1', () => {
      const movie = new Movie('MOV-001', 'The Godfather');
      movie.watch();
      expect(() => movie.rate(0)).toThrow(InvalidRatingError);
    });

    it('should throw an error when rating above 5', () => {
      const movie = new Movie('MOV-001', 'The Godfather');
      movie.watch();
      expect(() => movie.rate(6)).toThrow(InvalidRatingError);
    });
  });

  describe('getAverageRating', () => {
    it('should return null when no ratings have been submitted', () => {
      const movie = new Movie('MOV-001', 'The Godfather');
      expect(movie.getAverageRating()).toBe(null);
    });

    it('should return the rating when only one rating is submitted', () => {
      const movie = new Movie('MOV-001', 'The Godfather');
      movie.watch();
      movie.rate(4);
      expect(movie.getAverageRating()).toBe(4);
    });

    it('should return the correct average for multiple ratings', () => {
      const movie = new Movie('MOV-001', 'The Matrix');
      movie.watch();
      movie.rate(3);
      movie.rate(4);
      movie.rate(5);
      expect(movie.getAverageRating()).toBe(4);
    });

    it('should handle decimal averages correctly', () => {
      const movie = new Movie('MOV-001', 'The Matrix');
      movie.watch();
      movie.rate(4);
      movie.rate(5);
      expect(movie.getAverageRating()).toBe(4.5);
    });
  });
});
