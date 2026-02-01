import {
  PerTransactionLimitExceededError,
  CreditCardLimitExceededError,
  InvalidAmountError,
} from './errors.js';

export class CreditCard {
  private readonly cardNumber: string;
  private readonly cardLimit: number;
  private readonly perTransactionLimit: number;
  private outstandingBalance: number;

  constructor(
    cardNumber: string,
    cardLimit?: number,
    perTransactionLimit?: number
  ) {
    this.cardNumber = cardNumber;
    this.cardLimit = cardLimit ?? 500000;
    this.perTransactionLimit = perTransactionLimit ?? 50000;
    this.outstandingBalance = 0;
  }

  private isInvalidAmount(amount: number): boolean {
    return amount <= 0;
  }

  private isOverTransactionLimit(amount: number): boolean {
    return amount > this.perTransactionLimit;
  }

  private isOverCardLimit(amount: number): boolean {
    return this.outstandingBalance + amount > this.cardLimit;
  }

  public withdrawCash(amount: number) {
    if (this.isInvalidAmount(amount)) {
      throw new InvalidAmountError();
    }

    if (this.isOverTransactionLimit(amount)) {
      throw new PerTransactionLimitExceededError();
    }

    if (this.isOverCardLimit(amount)) {
      throw new CreditCardLimitExceededError();
    }

    this.outstandingBalance += amount;
  }

  public payBill(amount: number) {
    if (this.isInvalidAmount(amount)) {
      throw new InvalidAmountError();
    }

    if (this.isOverCardLimit(amount)) {
      throw new CreditCardLimitExceededError();
    }

    this.outstandingBalance += amount;
  }

  public repay(amount: number) {
    if (this.isInvalidAmount(amount)) {
      throw new InvalidAmountError();
    }

    this.outstandingBalance -= amount;
  }

  public getOutstandingBalance(): number {
    return this.outstandingBalance;
  }

  public getAvailableCredit(): number {
    return this.cardLimit - this.outstandingBalance;
  }
}
