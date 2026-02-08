export class CarNotAvailableError extends Error {
  constructor(message = 'Car not available for the operation') {
    super(message);
  }
}

export class InvalidPeriodError extends Error {
  constructor(message = 'Invalid period') {
    super(message);
  }
}

export class InvalidRateError extends Error {
  constructor(message = 'Invalid rate') {
    super(message);
  }
}

export class CarNotRentedError extends Error {
  constructor(message = 'Car is not currently rented') {
    super(message);
  }
}
