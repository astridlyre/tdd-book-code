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
      this.#money.reduce((acc, money) => acc + money.amount, 0),
      currency
    );
  }
}
