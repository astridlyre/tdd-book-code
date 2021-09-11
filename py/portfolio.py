import functools
import operator

from money import Money


class Portfolio:
    def __init__(self, *moneys):
        self.moneys = []
        self.moneys.extend(moneys)

    def __convert(self, aMoney, aCurrency):
        exchangeRates = {"EUR->USD": 1.2, "USD->KRW": 1100}
        if aMoney.currency == aCurrency:
            return aMoney.amount
        return aMoney.amount * exchangeRates[aMoney.currency + "->" + aCurrency]

    def evaluate(self, currency):
        return Money(
            functools.reduce(
                operator.add, map(lambda m: self.__convert(m, currency), self.moneys), 0
            ),
            currency,
        )

    def add(self, *moneys):
        self.moneys.extend(moneys)
