import assert from "assert";
import { describe } from "mocha";
import Money from "../money.js";

describe("Test Money class", function () {
  describe("Test multiplication of two amounts of the same currency", function () {
    it("should multiply euros correctly and have proper currecy value", function () {
      const tenEuros = new Money(10, "EUR");
      const twentyEuros = new Money(20, "EUR");
      assert.deepStrictEqual(tenEuros.times(new Money(2, "EUR")), twentyEuros);
    });
  });

  describe("Test multiplication of two amounts of different currency", function () {
    it("should throw a TypeError when attempting to multiply two different currencies", function () {
      const tenEuros = new Money(10, "EUR");
      const twentyDollars = new Money(20, "USD");
      assert.throws(() => tenEuros.multiply(twentyDollars));
      assert.throws(() => twentyDollars.multiply(tenEuros));
    });
  });

  describe("Test division of two amounts of the same currency", function () {
    it("should divide won correctly and have proper currency value", function () {
      const originalMoney = new Money(4002, "KRW");
      const expectedMoney = new Money(1000.5, "KRW");
      assert.deepStrictEqual(
        originalMoney.divide(new Money(4, "KRW")),
        expectedMoney
      );
    });
  });

  describe("Test division of two amounts of different currency", function () {
    it("should throw a TypeError when attempting to divide two different currencies", function () {
      const wons = new Money(19888, "KRW");
      const euros = new Money(25, "EUR");
      assert.throws(() => wons.multiply(euros));
      assert.throws(() => euros.multiply(wons));
    });
  });

  describe("Test addition of two amounts of the same currency", function () {
    it("should add dollars correctly and have the proper currency value", function () {
      const originalMoney = new Money(50, "USD");
      const expectedMoney = new Money(69, "USD");
      assert.deepStrictEqual(
        originalMoney.add(new Money(19, "USD")),
        expectedMoney
      );
    });
  });

  describe("Add two different currencies KRW + USD", function () {
    it("should throw a TypeError when attempting to add two different currencies", function () {
      const wons = new Money(4351, "KRW");
      const dollars = new Money(69, "USD");
      assert.throws(() => wons.add(dollars));
      assert.throws(() => dollars.add(wons));
    });
  });

  describe("Test Subtraction of Won", function () {
    it("should substract dollars correctly and have the proper currency value", function () {
      const originalMoney = new Money(5004, "KRW");
      const expectedMoney = new Money(5000, "KRW");
      assert.deepStrictEqual(
        originalMoney.subtract(new Money(4, "KRW")),
        expectedMoney
      );
    });
  });

  describe("Subtract two different currencies KRW - USD", function () {
    it("should throw a TypeError when attempting to subtract two different currencies", function () {
      const wons = new Money(4351, "KRW");
      const dollars = new Money(69, "USD");
      assert.throws(() => wons.subtract(dollars));
      assert.throws(() => dollars.subtract(wons));
    });
  });

  describe("Division by zero should throw an error", function () {
    it("should throw a TypeError when attempting to divide by zero", function () {
      const originalMoney = new Money(40, "USD");
      const error = new TypeError("Cannot divide by zero");
      assert.throws(() => originalMoney.divide(new Money(0, "USD")), error);
    });
  });
});
