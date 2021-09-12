package stocks

import "errors"

type Portfolio []Money

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(bank Bank, currency string) (*Money, error) {
	var result Money
	total := 0.0
	failedConversations := make([]string, 0)
	for _, m := range p {
		if convertedCurrency, err := bank.Convert(m, currency); err == nil {
			total = total + convertedCurrency.amount
		} else {
			failedConversations = append(failedConversations, err.Error())
		}
	}
	if len(failedConversations) == 0 {
		result = NewMoney(total, currency)
		return &result, nil
	}
	failures := "["
	for _, f := range failedConversations {
		failures = failures + f + ","
	}
	failures = failures + "]"
	return nil, errors.New("Missing exchange rate(s): " + failures)
}
