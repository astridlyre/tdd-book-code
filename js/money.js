export default class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  add(other) {
    Money.validateSameCurrency(this, other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other) {
    Money.validateSameCurrency(this, other);
    return new Money(this.amount - other.amount, this.currency);
  }

  times(other) {
    Money.validateSameCurrency(this, other);
    return new Money(this.amount * other.amount, this.currency);
  }

  divide(other) {
    Money.validateSameCurrency(this, other);
    if (other.amount === 0) {
      throw new TypeError("Cannot divide by zero");
    }
    return new Money(this.amount / other.amount, this.currency);
  }

  static validateSameCurrency(a, b) {
    if (!(a instanceof Money) || !(b instanceof Money)) {
      throw new TypeError("Can only combine two Money instances");
    }
    if (a.currency !== b.currency) {
      throw new TypeError(
        `Can only combine two values of the same currency: A: ${a.currency} B: ${b.currency}`
      );
    }
  }
}
