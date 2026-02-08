export class MovieNotWatchedError extends Error {
  constructor(message = 'Movie must be watched before rating') {
    super(message);
  }
}

export class InvalidRatingError extends Error {
  constructor(message = 'Rating must be between 1 and 5') {
    super(message);
  }
}
