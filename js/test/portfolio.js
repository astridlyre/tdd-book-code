import assert from "assert";
import { describe } from "mocha";
import Money from "../money.js";
import Portfolio from "../portfolio.js";

describe("Test Portfolio class", function () {
  describe("Test Constructor", function () {
    it("should initialize a portfolio with the proper amounts", function () {
      const tenEuros = new Money(10, "EUR");
      assert.deepStrictEqual(tenEuros, new Portfolio(tenEuros).evaluate("EUR"));
    });
  });

  describe("Test Addition", function () {
    it("should properly add money of the same currency", function () {
      const fifteenDollars = new Money(15, "USD");
      const portfolio = new Portfolio();
      portfolio.add(new Money(5, "USD"), new Money(10, "USD"));
      assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
    });
  });
});
