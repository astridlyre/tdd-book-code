import Money from "./money.js";

export default class Portfolio {
  #money;

  constructor(...money) {
    this.#money = money || [];
  }

  add(...money) {
    this.#money = this.#money.concat(money);
    return this;
  }

  evaluate(currency) {
    return new Money(
      this.#money.reduce(
        (acc, money) => acc + this.convert(money, currency),
        0
      ),
      currency
    );
  }

  convert(money, currency) {
    const eurToUsd = 1.2;
    if (money.currency === currency) {
      return money.amount;
    }
    return money.amount * eurToUsd;
  }
}
