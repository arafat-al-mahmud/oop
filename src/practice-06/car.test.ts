import { describe, it, expect } from 'vitest';
import { Car } from './car.js';
import { CarNotAvailableError, CarNotRentedError, InvalidPeriodError, InvalidRateError } from './errors.js';

describe('Car', () => {
  describe('daily rate', () => {
    it('should throw an error when setting rate to zero', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      expect(() => car.setDailyRate(0)).toThrow(InvalidRateError);
    });

    it('should throw an error when setting a negative rate', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      expect(() => car.setDailyRate(-100)).toThrow(InvalidRateError);
    });

    it('should use the updated rate for new rentals', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      car.setDailyRate(7000);
      const startDate = new Date('2026-02-01');
      const endDate = new Date('2026-02-04');
      const totalCost = car.rent(startDate, endDate);
      expect(totalCost).toBe(28000);
    });
  });

  describe('calculateCost', () => {
    it('should return the total cost for a given period', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      const startDate = new Date('2026-02-01');
      const endDate = new Date('2026-02-04');
      expect(car.calculateCost(startDate, endDate)).toBe(20000);
    });

    it('should not change the availability of the car', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      const startDate = new Date('2026-02-01');
      const endDate = new Date('2026-02-06');
      car.calculateCost(startDate, endDate);
      expect(car.isAvailable()).toBe(true);
    });

    it('should work even when the car is already rented', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      car.rent(new Date('2026-02-01'), new Date('2026-02-04'));
      expect(car.calculateCost(new Date('2026-02-15'), new Date('2026-02-22'))).toBe(40000);
    });

    it('should throw an error when end date is before start date', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      const startDate = new Date('2026-02-05');
      const endDate = new Date('2026-02-01');
      expect(() => car.calculateCost(startDate, endDate)).toThrow(InvalidPeriodError);
    });

    it('should calculate cost for a single-day rental when start and end date are the same', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      const date = new Date('2026-02-01');
      expect(car.calculateCost(date, date)).toBe(5000);
    });
  });

  describe('rent', () => {
    it('should make the car unavailable when rented', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      car.rent(new Date('2026-02-01'), new Date('2026-02-04'));
      expect(car.isAvailable()).toBe(false);
    });

    it('should calculate total cost based on the rental period and daily rate', () => {
      const car = new Car('CAR-002', 'Honda Civic', 4500);
      const totalCost = car.rent(new Date('2026-02-01'), new Date('2026-02-06'));
      expect(totalCost).toBe(27000);
    });

    it('should throw an error when renting an already rented car', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      car.rent(new Date('2026-02-01'), new Date('2026-02-04'));
      expect(() => car.rent(new Date('2026-02-10'), new Date('2026-02-12'))).toThrow(CarNotAvailableError);
    });

    it('should throw an error when end date is before start date', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      expect(() => car.rent(new Date('2026-02-05'), new Date('2026-02-01'))).toThrow(InvalidPeriodError);
    });

    it('should allow renting for a single day when start and end date are the same', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      const date = new Date('2026-02-01');
      const totalCost = car.rent(date, date);
      expect(totalCost).toBe(5000);
      expect(car.isAvailable()).toBe(false);
    });
  });

  describe('return', () => {
    it('should make the car available again when returned', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      car.rent(new Date('2026-02-01'), new Date('2026-02-04'));
      car.return();
      expect(car.isAvailable()).toBe(true);
    });

    it('should throw an error when returning a car that is not rented', () => {
      const car = new Car('CAR-001', 'Toyota Corolla', 5000);
      expect(() => car.return()).toThrow(CarNotRentedError);
    });

    it('should allow renting again after returning', () => {
      const car = new Car('CAR-003', 'Honda Civic', 4500);
      car.rent(new Date('2026-02-01'), new Date('2026-02-03'));
      car.return();
      const totalCost = car.rent(new Date('2026-02-10'), new Date('2026-02-14'));
      expect(totalCost).toBe(22500);
      expect(car.isAvailable()).toBe(false);
    });
  });
});
