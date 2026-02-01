import { describe, it, expect } from 'vitest';
import { CreditCard } from './credit-card.js';
import {
  InvalidAmountError,
  PerTransactionLimitExceededError,
  CreditCardLimitExceededError,
} from './errors.js';

describe('CreditCard', () => {
  describe('withdrawCash', () => {
    it('should increase outstanding balance on valid withdrawal', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.withdrawCash(10000);
      expect(card.getOutstandingBalance()).toBe(10000);
    });

    it('should throw InvalidAmountError for zero amount', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      expect(() => card.withdrawCash(0)).toThrow(InvalidAmountError);
    });

    it('should throw InvalidAmountError for negative amount', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      expect(() => card.withdrawCash(-100)).toThrow(InvalidAmountError);
    });

    it('should throw PerTransactionLimitExceededError when exceeding 50000', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      expect(() => card.withdrawCash(50001)).toThrow(
        PerTransactionLimitExceededError
      );
    });

    it('should throw CreditCardLimitExceededError when exceeding credit limit', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(480000);
      expect(() => card.withdrawCash(30000)).toThrow(
        CreditCardLimitExceededError
      );
    });
  });

  describe('payBill', () => {
    it('should increase outstanding balance on valid payment', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(100000);
      expect(card.getOutstandingBalance()).toBe(100000);
    });

    it('should allow payments above 50000 (no per-transaction limit)', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(100000);
      expect(card.getOutstandingBalance()).toBe(100000);
    });

    it('should throw CreditCardLimitExceededError when exceeding credit limit', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      expect(() => card.payBill(500001)).toThrow(CreditCardLimitExceededError);
    });
  });

  describe('repay', () => {
    it('should decrease outstanding balance on repayment', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(50000);
      card.repay(20000);
      expect(card.getOutstandingBalance()).toBe(30000);
    });

    it('should allow multiple repayments', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(50000);
      card.repay(10000);
      card.repay(10000);
      card.repay(10000);
      expect(card.getOutstandingBalance()).toBe(20000);
    });

    it('should allow overpayment resulting in negative balance (surplus)', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(10000);
      card.repay(15000);
      expect(card.getOutstandingBalance()).toBe(-5000);
    });

    it('should allow using surplus to pay bills beyond card limit', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.repay(10000); // create surplus of -10000
      card.payBill(510000); // 510000 + (-10000) = 500000, within limit
      expect(card.getOutstandingBalance()).toBe(500000);
    });
  });

  describe('getAvailableCredit', () => {
    it('should return correct available credit', () => {
      const card = new CreditCard('1234-5678-9012-3456');
      card.payBill(100000);
      expect(card.getAvailableCredit()).toBe(400000);
    });
  });
});
