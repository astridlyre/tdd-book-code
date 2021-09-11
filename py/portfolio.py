import functools
import operator

from money import Money


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
