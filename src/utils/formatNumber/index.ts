/* eslint-disable no-useless-escape */

export function formatNumberToSubmit(value: string): number {
  const removeCaractheres = value.replace(/^(R\$|\€)\s*/g, '')
  const valueWithoutFormatting = removeCaractheres
    .replace(/\./g, '')
    .replace(',', '.')
  const number = parseFloat(valueWithoutFormatting)
  return number
}

export function formatCurrencyMoney(value = 0, currency: string) {
  if (currency === 'hybrid') {
    return value.toLocaleString()
  }

  const formattedValue = new Intl.NumberFormat(currency, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return formattedValue
}

export const convertEurToReal = (quatationEur?: number, valueEur?: number) => {
  if (!quatationEur || !valueEur) return 0
  const tax = 2.11 / 100
  const valorEmReais = valueEur * quatationEur
  const valorTotalComTaxa = valorEmReais + valueEur * quatationEur * tax
  return valorTotalComTaxa ?? 0
}
