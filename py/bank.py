from money import Money


class Bank:
    def __init__(self):
        self.exchangeRates = {}

    def __keyFrom(self, currencyFrom, currencyTo):
        return f"{currencyFrom}->{currencyTo}"

    def addExchangeRate(self, currencyFrom, currencyTo, rate):
        self.exchangeRates[self.__keyFrom(currencyFrom, currencyTo)] = rate

    def convert(self, aMoney, aCurrency):
        if aMoney.currency == aCurrency:
            return Money(aMoney.amount, aCurrency)
        key = self.__keyFrom(aMoney.currency, aCurrency)
        if key in self.exchangeRates:
            return Money(aMoney.amount * self.exchangeRates[key], aCurrency)
        raise Exception(key)
