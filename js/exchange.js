import Money from "./money.js";

export default class Exchange {
  #exchangeRates = new Map();

  static #keyFrom(from, to) {
    return `${from}->${to}`;
  }

  addExchangeRate({ from = "", to = "", value = 0 } = {}) {
    this.#exchangeRates.set(Exchange.#keyFrom(from, to), value);
    return this;
  }

  async getRate(from, to) {
    return this.#exchangeRates.get(Exchange.#keyFrom(from, to));
  }

  async convert(aMoney, aCurrency) {
    if (aMoney.currency === aCurrency) {
      return new Money(aMoney.amount, aCurrency);
    }
    const rate = await this.getRate(aMoney.currency, aCurrency);
    if (!rate) {
      return Promise.reject(Exchange.#keyFrom(aMoney.currency, aCurrency));
    }
    return new Money(aMoney.amount * rate, aCurrency);
  }
}
