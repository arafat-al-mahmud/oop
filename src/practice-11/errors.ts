export class InvalidPlateNumberError extends Error {
  constructor(message = 'Plate number cannot be empty') {
    super(message);
  }
}

export class InvalidExpirationDateError extends Error {
  constructor(message = 'Expiration date must be after registration date') {
    super(message);
  }
}

export class InvalidManufactureYearError extends Error {
  constructor(message = 'Manufacture year cannot be in the future') {
    super(message);
  }
}

export class CarTooOldError extends Error {
  constructor(message = 'Car is too old for registration renewal') {
    super(message);
  }
}
