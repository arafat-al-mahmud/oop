import { LicensePlate } from './license-plate.js';
import { CarTooOldError, InvalidManufactureYearError } from './errors.js';

export class Car {
  private readonly owner: string;
  private readonly manufacturer: string;
  private readonly model: string;
  private readonly manufactureYear: number;
  private readonly licensePlate: LicensePlate;
  private static readonly MAX_AGE = 20;

  constructor(
    owner: string,
    manufacturer: string,
    model: string,
    manufactureYear: number,
    licensePlate: LicensePlate
  ) {
    if (manufactureYear > new Date().getFullYear()) {
      throw new InvalidManufactureYearError();
    }

    this.owner = owner;
    this.manufacturer = manufacturer;
    this.model = model;
    this.manufactureYear = manufactureYear;
    this.licensePlate = licensePlate;
  }

  public isLicenseExpired() {
    return this.licensePlate.isExpired();
  }

  public getAge(referenceYear: number = new Date().getFullYear()) {
    return referenceYear - this.manufactureYear;
  }

  public renewRegistration(newExpirationDate: Date) {
    if (this.getAge() > Car.MAX_AGE) {
      throw new CarTooOldError();
    }

    this.licensePlate.renew(newExpirationDate);
  }

  public toString() {
    return `${this.manufactureYear} ${this.manufacturer} ${this.model} (Owner: ${this.owner}) [${this.licensePlate}]`;
  }
}
