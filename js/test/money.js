import assert from "assert";
import { describe } from "mocha";
import Money from "../money.js";

describe("Test Money class", function () {
  describe("Test Dollars", function () {
    it("should multiply dollars correctly and have proper currency value", function () {
      const fiveDollars = new Money(5, "USD");
      const tenDollars = new Money(10, "USD");
      assert.deepStrictEqual(fiveDollars.times(2), tenDollars);
    });
  });

  describe("Test Euros", function () {
    it("should multiply euros correctly and have proper currecy value", function () {
      const tenEuros = new Money(10, "EUR");
      const twentyEuros = new Money(20, "EUR");
      assert.deepStrictEqual(tenEuros.times(2), twentyEuros);
    });
  });

  describe("Test Won", function () {
    it("should divide won correctly and have proper currency value", function () {
      const originalMoney = new Money(4002, "KRW");
      const expectedMoney = new Money(1000.5, "KRW");
      assert.deepStrictEqual(originalMoney.divide(4), expectedMoney);
    });
  });
});
