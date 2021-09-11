import functools
import operator

from money import Money


class Portfolio:
    def __init__(self, *moneys):
        self.moneys = []
        self._eur_to_usd = 1.2
        self.moneys.extend(moneys)

    def __convert(self, aMoney, aCurrency):
        if aMoney.currency == aCurrency:
            return aMoney.amount
        return aMoney.amount * self._eur_to_usd

    def evaluate(self, currency):
        return Money(
            functools.reduce(
                operator.add, map(lambda m: self.__convert(m, currency), self.moneys), 0
            ),
            currency,
        )

    def add(self, *moneys):
        self.moneys.extend(moneys)
