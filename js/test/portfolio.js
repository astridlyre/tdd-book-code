import assert from "assert";
import { describe } from "mocha";
import Money from "../money.js";
import Portfolio from "../portfolio.js";
import Exchange from "../exchange.js";

describe("Test Portfolio class", function () {
  let exchange;
  beforeEach(function () {
    exchange = new Exchange();
    exchange
      .addExchangeRate({
        from: "EUR",
        to: "USD",
        value: 1.2,
      })
      .addExchangeRate({
        from: "USD",
        to: "KRW",
        value: 1100,
      });
  });

  describe("Test Constructor", function () {
    it("should initialize a portfolio with the proper amounts", async function () {
      const tenEuros = new Money(10, "EUR");
      assert.deepStrictEqual(
        tenEuros,
        await new Portfolio(tenEuros).evaluate("EUR", exchange)
      );
    });
  });

  describe("Test Addition", function () {
    it("should properly add money of the same currency", async function () {
      const fifteenDollars = new Money(15, "USD");
      const portfolio = new Portfolio();
      portfolio.add(new Money(5, "USD"), new Money(10, "USD"));
      assert.deepStrictEqual(
        await portfolio.evaluate("USD", exchange),
        fifteenDollars
      );
    });
  });

  describe("Test Addition in different currencies USD+EUR->USD", function () {
    it("should properly add money of different currencies, accounting for exchange rate", async function () {
      const seventeenDollars = new Money(17, "USD");
      const portfolio = new Portfolio(
        new Money(5, "USD"),
        new Money(10, "EUR")
      );
      assert.deepStrictEqual(
        await portfolio.evaluate("USD", exchange),
        seventeenDollars
      );
    });
  });

  describe("Test Addition in different currencies USD+KRW->KRW", function () {
    it("should properly add money of different currencies, accounting for exchange rate", async function () {
      const portfolio = new Portfolio(
        new Money(1, "USD"),
        new Money(1100, "KRW")
      );
      const expectedValue = new Money(2200, "KRW");
      assert.deepStrictEqual(
        await portfolio.evaluate("KRW", exchange),
        expectedValue
      );
    });
  });

  describe("Test Addition with multiple missing exchange rates", function () {
    it("should throw an error with a list of missing exchange rates", async function () {
      const portfolio = new Portfolio(
        new Money(1, "USD"),
        new Money(1, "EUR"),
        new Money(1, "KRW")
      );
      const expectedError = new Error(
        "Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]"
      );
      assert.rejects(
        async () => await portfolio.evaluate("Kalganid", exchange),
        expectedError
      );
    });
  });
});
