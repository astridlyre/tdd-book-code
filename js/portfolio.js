import Exchange from "./exchange.js";
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

  evaluate(currency) {
    const failures = [];
    const total = this.#money.reduce((acc, money) => {
      const exchange = new Exchange(money.currency, currency);
      if (!exchange.rate) {
        failures.push(exchange.key);
        return acc;
      }
      return acc + exchange.rate * money.amount;
    }, 0);

    if (failures.length === 0) {
      return new Money(total, currency);
    }

    throw new EvaluationError(`Missing exchange rate(s): [${failures.join()}]`);
  }
}
