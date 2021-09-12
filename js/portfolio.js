import Money from "./money.js";

function createErrorMessage(failures) {
  return failures.map(failure => failure.reason).join();
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
      return converted.reduce(
        (acc, result) => acc.add(result.value),
        new Money(0, aCurrency)
      );
    }
    throw new Error(
      `Missing exchange rate(s): [${createErrorMessage(failures)}]`
    );
  }
}
