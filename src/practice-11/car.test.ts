import { describe, it, expect } from 'vitest';
import { LicensePlate } from './license-plate.js';
import { Car } from './car.js';
import {
  InvalidPlateNumberError,
  InvalidExpirationDateError,
  InvalidManufactureYearError,
  CarTooOldError,
} from './errors.js';

describe('LicensePlate', () => {
  it('should create a valid license plate', () => {
    const plate = new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2027-01-01'));
    expect(plate.getPlateNo()).toBe('ABC-123');
    expect(plate.getRegistrationDate()).toEqual(new Date('2025-01-01'));
    expect(plate.getExpirationDate()).toEqual(new Date('2027-01-01'));
  });

  it('should throw InvalidPlateNumberError for empty plate number', () => {
    expect(() => new LicensePlate('', new Date('2025-01-01'), new Date('2027-01-01'))).toThrow(InvalidPlateNumberError);
  });

  it('should throw InvalidPlateNumberError for whitespace-only plate number', () => {
    expect(() => new LicensePlate('   ', new Date('2025-01-01'), new Date('2027-01-01'))).toThrow(InvalidPlateNumberError);
  });

  it('should throw InvalidExpirationDateError when expiration is before registration', () => {
    expect(() => new LicensePlate('ABC-123', new Date('2025-06-01'), new Date('2025-01-01'))).toThrow(InvalidExpirationDateError);
  });

  it('should throw InvalidExpirationDateError when expiration equals registration', () => {
    expect(() => new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2025-01-01'))).toThrow(InvalidExpirationDateError);
  });

  it('should return true when plate is expired', () => {
    const plate = new LicensePlate('ABC-123', new Date('2020-01-01'), new Date('2024-01-01'));
    expect(plate.isExpired()).toBe(true);
  });

  it('should return false when plate is not expired', () => {
    const plate = new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2030-01-01'));
    expect(plate.isExpired()).toBe(false);
  });

  it('should accept a reference date for expiry check', () => {
    const plate = new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2027-06-01'));
    expect(plate.isExpired(new Date('2027-01-01'))).toBe(false);
    expect(plate.isExpired(new Date('2028-01-01'))).toBe(true);
  });

  it('should return correct toString', () => {
    const plate = new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2027-01-01'));
    expect(plate.toString()).toBe('ABC-123 (Registered: 2025-01-01, Expires: 2027-01-01)');
  });

  it('should update expiration date on renewal', () => {
    const plate = new LicensePlate('ABC-123', new Date('2023-01-01'), new Date('2025-06-01'));
    const originalRegistration = plate.getRegistrationDate();
    const newExpiration = new Date('2028-01-01');
    plate.renew(newExpiration);
    expect(plate.getExpirationDate()).toEqual(newExpiration);
    expect(plate.getRegistrationDate()).toEqual(originalRegistration);
  });
});

describe('Car', () => {
  function createValidPlate() {
    return new LicensePlate('ABC-123', new Date('2025-01-01'), new Date('2030-01-01'));
  }

  function createExpiredPlate() {
    return new LicensePlate('XYZ-789', new Date('2020-01-01'), new Date('2024-01-01'));
  }

  it('should create a valid car with correct toString', () => {
    const plate = createValidPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2022, plate);
    expect(car.toString()).toBe('2022 Tesla Model 3 (Owner: John Doe) [ABC-123 (Registered: 2025-01-01, Expires: 2030-01-01)]');
  });

  it('should throw InvalidManufactureYearError for future year', () => {
    const plate = createValidPlate();
    expect(() => new Car('John Doe', 'Tesla', 'Model 3', 2030, plate)).toThrow(InvalidManufactureYearError);
  });

  it('should calculate the correct age', () => {
    const plate = createValidPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2020, plate);
    expect(car.getAge(2026)).toBe(6);
  });

  it('should return true when license is expired', () => {
    const plate = createExpiredPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2020, plate);
    expect(car.isLicenseExpired()).toBe(true);
  });

  it('should return false when license is not expired', () => {
    const plate = createValidPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2020, plate);
    expect(car.isLicenseExpired()).toBe(false);
  });

  it('should renew registration for a valid car', () => {
    const plate = createValidPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2020, plate);
    car.renewRegistration(new Date('2032-01-01'));
    expect(car.isLicenseExpired()).toBe(false);
  });

  it('should allow renewal even when license is expired', () => {
    const plate = createExpiredPlate();
    const car = new Car('John Doe', 'Tesla', 'Model 3', 2020, plate);
    expect(car.isLicenseExpired()).toBe(true);
    car.renewRegistration(new Date('2030-01-01'));
    expect(car.isLicenseExpired()).toBe(false);
  });

  it('should throw CarTooOldError when car is older than 20 years', () => {
    const plate = createValidPlate();
    const car = new Car('John Doe', 'Classic', 'Vintage', 2000, plate);
    expect(() => car.renewRegistration(new Date('2032-01-01'))).toThrow(CarTooOldError);
  });

  it('should allow renewal when car is exactly 20 years old', () => {
    const plate = createValidPlate();
    const currentYear = new Date().getFullYear();
    const car = new Car('John Doe', 'Toyota', 'Camry', currentYear - 20, plate);
    car.renewRegistration(new Date('2032-01-01'));
    expect(car.isLicenseExpired()).toBe(false);
  });
});
