export class BankAccount {
  private accountNumber: string;
  private accountHolderName: string;
  private balance: number;

  constructor(
    accountNumber: string,
    accountHolderName: string,
    balance: number
  ) {
    this.accountNumber = accountNumber;
    this.accountHolderName = accountHolderName;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount < 0) {
      throw new Error('Deposit amount must be positive.');
    }
    this.balance += amount;
    console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount < 0) {
      throw new Error('Withdrawal amount must be positive.');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient balance.');
    }
    this.balance -= amount;
    console.log(`Withdrawn: $${amount}. New balance: $${this.balance}`);
  }

  getAccountHolderName(): string {
    return this.accountHolderName;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getBalance(): number {
    return this.balance;
  }
}
