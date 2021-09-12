package stocks

import "errors"

type Portfolio []Money

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(bank Bank, currency string) (*Money, error) {
	result := NewMoney(0, currency)
	failedConversions := make([]string, 0)
	for _, m := range p {
		if convertedCurrency, err := bank.Convert(m, currency); err == nil {
			result = result.Add(convertedCurrency.amount)
		} else {
			failedConversions = append(failedConversions, err.Error())
		}
	}
	if len(failedConversions) == 0 {
		return &result, nil
	}
	return nil, errors.New("Missing exchange rate(s): " + createFailureMessage(failedConversions))
}

func createFailureMessage(failedConversions []string) string {
	failures := "["
	for _, f := range failedConversions {
		failures = failures + f + ","
	}
	return failures + "]"
}
