import { InvalidPlateNumberError, InvalidExpirationDateError } from './errors.js';

export class LicensePlate {
    private readonly plateNo: string;
    private readonly registrationDate: Date;
    private expirationDate: Date;

    constructor(plateNo: string, registrationDate: Date, expirationDate: Date) {
        if (!plateNo.trim()) {
            throw new InvalidPlateNumberError();
        }

        if (expirationDate.getTime() <= registrationDate.getTime()) {
            throw new InvalidExpirationDateError();
        }

        this.plateNo = plateNo;
        this.registrationDate = registrationDate;
        this.expirationDate = expirationDate;
    }

    public getPlateNo() {
        return this.plateNo;
    }

    public getRegistrationDate() {
        return this.registrationDate;
    }

    public getExpirationDate() {
        return this.expirationDate;
    }

    public isExpired(referenceDate: Date = new Date()) {
        return this.expirationDate < referenceDate;
    }

    public renew(newExpirationDate: Date) {
        this.expirationDate = newExpirationDate;
    }

    public toString() {
        return `${this.plateNo} (Registered: ${this.registrationDate.toISOString().split('T')[0]}, Expires: ${this.expirationDate.toISOString().split('T')[0]})`;
    }
}
