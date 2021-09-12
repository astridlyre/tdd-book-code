export default class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  add(value) {
    return new Money(this.amount + value, this.currency);
  }

  subtract(value) {
    return new Money(this.amount - value, this.currency);
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor) {
    if (divisor === 0) {
      throw new TypeError("Cannot divide by zero");
    }
    return new Money(this.amount / divisor, this.currency);
  }
}
