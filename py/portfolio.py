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
        total = 0.0
        failures = []
        for m in self.moneys:
            try:
                total += self.__convert(m, currency)
            except KeyError as ke:
                failures.append(ke)

        if len(failures) == 0:
            return Money(total, currency)

        failureMessage = ",".join(f.args[0] for f in failures)
        raise Exception(f"Missing exchange rate(s): [{failureMessage}]")

    def add(self, *moneys):
        self.moneys.extend(moneys)
