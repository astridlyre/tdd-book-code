package stocks

import "errors"

type Portfolio []Money

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(currency string) (Money, error) {
	total := 0.0
	failedConversations := make([]string, 0)
	for _, m := range p {
		if convertedAmount, ok := convert(m, currency); ok {
			total = total + convertedAmount
		} else {
			failedConversations = append(failedConversations, m.currency+"->"+currency)
		}
	}
	if len(failedConversations) == 0 {
		return NewMoney(total, currency), nil
	}
	failures := "["
	for _, f := range failedConversations {
		failures = failures + f + ","
	}
	failures = failures + "]"
	return NewMoney(0, ""), errors.New("Missing exchange rate(s): " + failures)
}

func convert(money Money, currency string) (float64, bool) {
	exchangeRates := map[string]float64{
		"EUR->USD": 1.2,
		"USD->KRW": 1100,
	}
	if money.currency == currency {
		return money.amount, true
	}
	rate, ok := exchangeRates[money.currency+"->"+currency]
	return money.amount * rate, ok
}
