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

interface YearProjection {
  year: number
  endValue: number
  totalInvested: number
  interestGenerated: number
  monthlyContribution: number
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

export const calculateCompoundInterestProjection = ({
  principal,
  annualRate,
  years,
  getMonthlyContribution,
  getAnnualAdjustment,
  adjustmentTiming = 'end'
}: CalculateCompoundInterestParams): YearProjection[] => {
  const results: YearProjection[] = []
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1

  let fv = principal
  let cumulativeContributions = 0

  const today = new Date()
  const currentMonth = today.getMonth() // 0-indexed (janeiro = 0)

  for (let i = 0; i < years; i++) {
    const monthlyContribution = getMonthlyContribution(i)
    const annualAdjustment = getAnnualAdjustment(i)
    const netAdjustment =
      (annualAdjustment.receivables || 0) -
      ((annualAdjustment.downPayment || 0) +
        (annualAdjustment.homePurchases || 0) +
        (annualAdjustment.otherDeductions || 0))

    // Para o primeiro ano (i === 0), calcula apenas os meses restantes. Para os outros, 12 meses.
    const monthsInThisYear = i === 0 ? 12 - currentMonth : 12

    let yearStartValue = fv

    if (adjustmentTiming === 'start') {
      yearStartValue += netAdjustment
    }

    let monthlyFv = yearStartValue
    // O loop mensal agora usa o número correto de meses para o ano corrente.
    for (let month = 0; month < monthsInThisYear; month++) {
      monthlyFv = (monthlyFv + monthlyContribution) * (1 + monthlyRate)
    }

    fv = monthlyFv

    if (adjustmentTiming === 'end') {
      fv += netAdjustment
    }

    // Contribuição cumulativa também considera o número de meses correto.
    cumulativeContributions +=
      monthlyContribution * monthsInThisYear + netAdjustment
    const totalInvested = principal + cumulativeContributions
    const interestGenerated = fv - totalInvested

    results.push({
      year: i + 1,
      endValue: fv,
      totalInvested,
      interestGenerated,
      monthlyContribution
    })
  }

  return results
}
