import { BankAccount } from './bank-account.js';

const account1 = new BankAccount('123456789', 'John Doe', 1000);
account1.deposit(500);
account1.withdraw(200);
console.log(account1.getBalance());

const account2 = new BankAccount('987654321', 'Jane Doe', 2000);
account2.deposit(1000);
account2.withdraw(500);
console.log(account2.getBalance());
