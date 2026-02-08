import {
  CarNotAvailableError,
  CarNotRentedError,
  InvalidPeriodError,
  InvalidRateError,
} from './errors.js';

export class Car {
  private readonly id: string;
  private readonly model: string;
  private dailyRate: number;
  private inRent: boolean;

  constructor(id: string, model: string, dailyRate: number) {
    this.id = id;
    this.model = model;
    this.dailyRate = dailyRate;
    this.inRent = false;
  }

  private isInRent() {
    return this.inRent;
  }

  private isRateValid(dailyRate: number) {
    return dailyRate > 0;
  }

  private isPeriodValid(startDate: Date, endDate: Date) {
    return startDate.getTime() <= endDate.getTime();
  }

  public isAvailable() {
    return !this.isInRent();
  }

  public setDailyRate(dailyRate: number) {
    if (this.isInRent()) {
      throw new CarNotAvailableError(
        "Daily rate can't be changed while a car is in rent"
      );
    }

    if (!this.isRateValid(dailyRate)) {
      throw new InvalidRateError();
    }

    this.dailyRate = dailyRate;
  }

  public calculateCost(startDate: Date, endDate: Date) {
    if (!this.isPeriodValid(startDate, endDate)) {
      throw new InvalidPeriodError();
    }

    const numDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    return numDays * this.dailyRate;
  }

  public rent(startDate: Date, endDate: Date) {
    if (this.isInRent()) {
      throw new CarNotAvailableError('Car is already in rent');
    }

    if (!this.isPeriodValid(startDate, endDate)) {
      throw new InvalidPeriodError();
    }

    const totalCost = this.calculateCost(startDate, endDate);
    this.inRent = true;

    return totalCost;
  }

  public return() {
    if (!this.isInRent()) {
      throw new CarNotRentedError();
    }

    this.inRent = false;
  }
}
