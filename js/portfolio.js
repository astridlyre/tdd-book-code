import Money from "./money.js";

class EvaluationError extends Error {
  constructor(message) {
    super(message);
  }
}

export default class Portfolio {
  #money;

  constructor(...money) {
    this.#money = money || [];
  }

  add(...money) {
    this.#money = this.#money.concat(money);
    return this;
  }

  async evaluate(aCurrency, exchange) {
    const converted = await Promise.allSettled(
      this.#money.map(aMoney => exchange.convert(aMoney, aCurrency))
    );
    const failures = converted.filter(result => result.status === "rejected");

    if (failures.length === 0) {
      return new Money(
        converted.reduce((acc, result) => acc + result.value.amount, 0),
        aCurrency
      );
    }

    throw new EvaluationError(
      `Missing exchange rate(s): [${failures
        .map(failure => failure.reason)
        .join()}]`
    );
  }
}
