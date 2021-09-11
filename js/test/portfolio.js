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

  describe("Test Addition in different currencies USD+EUR->USD", function () {
    it("should properly add money of different currencies, accounting for exchange rate", function () {
      const seventeenDollars = new Money(17, "USD");
      const portfolio = new Portfolio(
        new Money(5, "USD"),
        new Money(10, "EUR")
      );
      assert.deepStrictEqual(portfolio.evaluate("USD"), seventeenDollars);
    });
  });

  describe("Test Addition in different currencies USD+KRW->KRW", function () {
    it("should properly add money of different currencies, accounting for exchange rate", function () {
      const portfolio = new Portfolio(
        new Money(1, "USD"),
        new Money(1100, "KRW")
      );
      const expectedValue = new Money(2200, "KRW");
      assert.deepStrictEqual(portfolio.evaluate("KRW"), expectedValue);
    });
  });

  describe("Test Addition with multiple missing exchange rates", function () {
    it("should throw an error with a list of missing exchange rates", function () {
      const portfolio = new Portfolio(
        new Money(1, "USD"),
        new Money(1, "EUR"),
        new Money(1, "KRW")
      );
      const expectedError = new Error(
        "Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]"
      );
      assert.throws(() => portfolio.evaluate("Kalganid"), expectedError);
    });
  });
});
