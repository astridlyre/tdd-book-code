import assert from "assert";
import { describe } from "mocha";
import Exchange from "../exchange.js";
import Money from "../money.js";

describe("Testing Exchange class", function () {
  let exchange;
  beforeEach(function () {
    exchange = new Exchange();
    exchange.addExchangeRate({
      from: "EUR",
      to: "USD",
      value: 1.2,
    });
  });

  describe("Test Conversion between two currencies", function () {
    it("should convert the currency with the proper exchange rate", async function () {
      const tenEuros = new Money(10, "EUR");
      assert.deepStrictEqual(
        await exchange.convert(tenEuros, "USD"),
        new Money(12, "USD")
      );
    });
  });

  describe("Test Conversation between two currencies after changing exchange rate", function () {
    it("should convert the currency with the new exchange rate", async function () {
      const tenEuros = new Money(10, "EUR");
      exchange.addExchangeRate({
        from: "EUR",
        to: "USD",
        value: 1.3,
      });
      assert.deepStrictEqual(
        await exchange.convert(tenEuros, "USD"),
        new Money(13, "USD")
      );
    });
  });

  describe("Test Conversation between two currencies with a newly added exchange rate", function () {
    it("should convert the currency with the newly added exchange rate", async function () {
      const tenEuros = new Money(10, "EUR");
      exchange.addExchangeRate({
        from: "EUR",
        to: "KRW",
        value: 1300,
      });
      assert.deepStrictEqual(
        await exchange.convert(tenEuros, "KRW"),
        new Money(13000, "KRW")
      );
      exchange.addExchangeRate({
        from: "EUR",
        to: "KRW",
        value: 1344,
      });
      assert.deepStrictEqual(
        await exchange.convert(tenEuros, "KRW"),
        new Money(13440, "KRW")
      );
    });
  });
});
