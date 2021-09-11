import functools
import operator
import unittest


class Portfolio:
    def __init__(self, *moneys):
        self.moneys = []
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        return Money(
            functools.reduce(operator.add, map(lambda m: m.amount, self.moneys), 0),
            currency,
        )

    def add(self, *moneys):
        self.moneys.extend(moneys)


class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency

    def times(self, multiplier):
        return Money(self.amount * multiplier, self.currency)

    def divide(self, divisor):
        return Money(self.amount / divisor, self.currency)


class TestMoney(unittest.TestCase):
    def testMultiplicationInDollars(self):
        fiveDollars = Money(5, "USD")
        tenDollars = Money(10, "USD")
        self.assertEqual(fiveDollars.times(2), tenDollars)

    def testMultiplicationInEuros(self):
        tenEuros = Money(10, "EUR")
        twentyEuros = Money(20, "EUR")
        self.assertEqual(tenEuros.times(2), twentyEuros)

    def testDivisionInWons(self):
        originalMoney = Money(4002, "KRW")
        expectedMoneyAfterDivision = Money(1000.5, "KRW")
        self.assertEqual(originalMoney.divide(4), expectedMoneyAfterDivision)

    def testAddition(self):
        fiveDollars = Money(5, "USD")
        tenDollars = Money(10, "USD")
        fiftenDollars = Money(15, "USD")
        portfolio = Portfolio()
        portfolio.add(fiveDollars, tenDollars)
        self.assertEqual(fiftenDollars, portfolio.evaluate("USD"))


if __name__ == "__main__":
    unittest.main()
