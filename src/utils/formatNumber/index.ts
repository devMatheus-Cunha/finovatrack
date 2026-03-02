export function formatCurrencyMoney(
  value = 0,
  currency?: string,
  isVisibility = true
) {
  if (currency === 'hybrid') {
    return value.toLocaleString()
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)

  return isVisibility ? formattedValue : '****'
}

export const convertEurToReal = (
  quatation?: number,
  valueSecondaryCurrency?: number
) => {
  if (!quatation || !valueSecondaryCurrency) return 0
  const tax = 1.964 / 100
  const valuePrimaryCurrency = valueSecondaryCurrency * quatation
  const valorTotalComTaxa =
    valuePrimaryCurrency + valueSecondaryCurrency * quatation * tax
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

export function currentAndPreviousYearValidity(
  year?: string | number
): boolean {
  const currentYear = new Date().getFullYear()
  return Number(year) <= currentYear
}
interface AnnualAdjustment {
  receivables: number
  downPayment?: number
  homePurchases?: number
  otherDeductions?: number
}

export interface CalculateCompoundInterestParams {
  principal: number
  annualRate: number // ex: 5 para 5%
  years: number
  getMonthlyContribution: (yearIndex: number) => number
  getAnnualAdjustment: (yearIndex: number) => AnnualAdjustment
  adjustmentTiming?: 'start' | 'end'
}

export interface CalculateCompoundInterestParams {
  principal: number
  annualRate: number // ex: 5 para 5%
  years: number
  getMonthlyContribution: (yearIndex: number) => number
  getAnnualAdjustment: (yearIndex: number) => AnnualAdjustment
  adjustmentTiming?: 'start' | 'end'
}
