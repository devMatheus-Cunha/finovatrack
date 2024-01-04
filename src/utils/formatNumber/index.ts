export function formatCurrencyMoney(value = 0, currency?: string) {
  if (currency === 'hybrid') {
    return value.toLocaleString()
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)

  return formattedValue
}

export const convertEurToReal = (quatationEur?: number, valueEur?: number) => {
  if (!quatationEur || !valueEur) return 0
  const tax = 1.964 / 100
  const valorEmReais = valueEur * quatationEur
  const valorTotalComTaxa = valorEmReais + valueEur * quatationEur * tax
  return valorTotalComTaxa ?? 0
}

export function formatToJavaScriptNumber(value: string) {
  value = value.replace(/\./g, '')

  value = value.replace(/,/, '.')

  const parsedNumber = parseFloat(value)

  if (!isNaN(parsedNumber)) {
    return parsedNumber
  } else {
    return NaN
  }
}

export function formatToCustomFormat(number = 0): string | undefined {
  if (typeof number !== 'number') {
    return undefined
  }

  return number.toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
