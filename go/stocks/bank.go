package stocks

import "errors"

type Bank struct {
	exchangeRates map[string]float64
}

func keyFrom(currencyFrom string, currencyTo string) string {
	return currencyFrom + "->" + currencyTo
}

func (b Bank) AddExchangeRate(currencyFrom string, currencyTo string, rate float64) {
	b.exchangeRates[keyFrom(currencyFrom, currencyTo)] = rate
}

func (b Bank) Convert(money Money, currencyTo string) (convertedMoney *Money, err error) {
	var result Money
	if money.currency == currencyTo {
		result = NewMoney(money.amount, currencyTo)
		return &result, nil
	}
	rate, ok := b.exchangeRates[keyFrom(money.currency, currencyTo)]
	if ok {
		result = NewMoney(money.amount*rate, currencyTo)
		return &result, nil
	}
	return nil, errors.New(keyFrom(money.currency, currencyTo))
}

func NewBank() Bank {
	return Bank{exchangeRates: make(map[string]float64)}
}
