export interface IFinancialPlanningProps {
  id: string
  year: string
  investments: string
  reserve: string
  monthlyContributions: string
  receivables: string
  downPayment?: string
  homePurchases?: string
  otherDeductions?: string
  periodContributions: string
}

interface ProjectionParams {
  principal: number
  annualRate: number
  financialPlanningYear?: IFinancialPlanningProps[]
  durationInYears?: number
  goalDate?: { year: number; month: number }
  startDate?: Date
  monthlyDividends?: number
}

interface YearProjection {
  year: number
  calendarYear: number
  endValue: number
  totalInvested: number
  interestGenerated: number
  contributionDetails: {
    monthly: number
    annualAdjustment: number
    periods: number
  }
  monthsRemaining?: number
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Calcula uma projeção usando taxa anual efetiva convertida para taxa diária
 * e capitalização diária, com aportes mensais aplicados ao fim de cada mês.
 */
export const calculateProjection = (
  params: ProjectionParams
): YearProjection[] => {
  const {
    principal,
    annualRate,
    financialPlanningYear = [],
    durationInYears,
    goalDate,
    startDate,
    monthlyDividends = 0
  } = params

  const results: YearProjection[] = []

  const annualRateDecimal = annualRate > 0 ? annualRate / 100 : 0
  const dailyRate =
    annualRateDecimal > 0 ? (1 + annualRateDecimal) ** (1 / 365) - 1 : 0

  const baseDate = startDate ? new Date(startDate) : new Date()
  baseDate.setHours(0, 0, 0, 0)

  const startYear = baseDate.getFullYear()
  const startMonth = baseDate.getMonth()
  const startDay = baseDate.getDate()

  let futureValue = principal
  let cumulativeContributions = 0
  let totalInterestAccumulated = 0
  let lastPlan: IFinancialPlanningProps | undefined = undefined

  const endYear = goalDate?.year || startYear + (durationInYears || 1)
  const loopDuration = endYear - startYear + 1

  for (let i = 0; i < loopDuration; i++) {
    const calendarYear = startYear + i
    const currentPlan = financialPlanningYear.find(
      (p) => Number(p.year) === calendarYear
    )
    if (currentPlan) lastPlan = currentPlan

    const monthlyContribution = Number(lastPlan?.monthlyContributions) || 0
    const annualAdjustment =
      (Number(lastPlan?.receivables) || 0) -
      ((Number(lastPlan?.downPayment) || 0) +
        (Number(lastPlan?.homePurchases) || 0) +
        (Number(lastPlan?.otherDeductions) || 0))

    const numberOfPeriods = Number(lastPlan?.periodContributions) || 0

    const currentYearStartMonth = i === 0 ? startMonth : 0
    const currentYearEndMonth =
      goalDate && calendarYear === goalDate.year ? goalDate.month : 11

    let contributionsMadeThisYear = 0

    for (
      let month = currentYearStartMonth;
      month <= currentYearEndMonth;
      month++
    ) {
      const daysInMonth = getDaysInMonth(calendarYear, month)
      const isFirstMonthOfProjection = i === 0 && month === startMonth
      const daysToProcess = isFirstMonthOfProjection
        ? daysInMonth - startDay + 1
        : daysInMonth

      for (let dayIndex = 0; dayIndex < daysToProcess; dayIndex++) {
        const dailyInterest = futureValue * dailyRate
        futureValue += dailyInterest
        totalInterestAccumulated += dailyInterest
      }

      let contributionThisMonth = 0
      if (contributionsMadeThisYear < numberOfPeriods) {
        contributionThisMonth = monthlyContribution
        cumulativeContributions += monthlyContribution
        contributionsMadeThisYear++
      }

      if (month === 11) {
        contributionThisMonth += annualAdjustment
        cumulativeContributions += annualAdjustment
      }

      futureValue += contributionThisMonth + monthlyDividends
    }

    results.push({
      year: i + 1,
      calendarYear,
      endValue: futureValue,
      totalInvested: principal + cumulativeContributions,
      interestGenerated: totalInterestAccumulated,
      contributionDetails: {
        monthly: monthlyContribution,
        annualAdjustment: annualAdjustment,
        periods: contributionsMadeThisYear
      }
    })
  }

  if (results.length > 0 && goalDate) {
    const diffMonths =
      (goalDate.year - startYear) * 12 + (goalDate.month - startMonth)
    results[results.length - 1].monthsRemaining = Math.max(0, diffMonths + 1)
  }

  return results
}
