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

  describe("Test Dollars", function () {
    it("should add dollars correctly and have the proper currency value", function () {
      const originalMoney = new Money(50, "USD");
      const expectedMoney = new Money(69, "USD");
      assert.deepStrictEqual(originalMoney.add(19), expectedMoney);
    });
  });

  describe("Test Subtraction of Won", function () {
    it("should substract dollars correctly and have the proper currency value", function () {
      const originalMoney = new Money(5004, "KRW");
      const expectedMoney = new Money(5000, "KRW");
      assert.deepStrictEqual(originalMoney.subtract(4), expectedMoney);
    });
  });

  describe("Division by zero should throw an error", function () {
    it("should throw a TypeError when attempting to divide by zero", function () {
      const originalMoney = new Money(40, "USD");
      const error = new TypeError("Cannot divide by zero");
      assert.throws(() => originalMoney.divide(0), error);
    });
  });
});
