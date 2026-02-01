
export class InvalidAmountError extends Error {
    constructor() {
        super('Invalid amount');
    }
}

export class PerTransactionLimitExceededError extends Error {
    constructor() {
        super('Per transaction limit exceeded');
    }
}

export class CreditCardLimitExceededError extends Error {
    constructor() {
        super('Credit card limit exceeded');
    }
}