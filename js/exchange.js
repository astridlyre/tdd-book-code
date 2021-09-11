export default class Exchange {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  toString() {
    return `${this.key}: ${this.rate}`;
  }

  get key() {
    return `${this.from}->${this.to}`;
  }

  get rate() {
    if (this.from === this.to) return 1; // Always equals itself
    return Exchange.getRate(this.key);
  }

  static getRate(key) {
    return Exchange.exchangeRates.get(key);
  }

  static exchangeRates = new Map([
    ["EUR->USD", 1.2],
    ["USD->KRW", 1100],
  ]);
}
