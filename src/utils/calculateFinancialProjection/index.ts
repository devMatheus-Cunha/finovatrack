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
  totoalReserveLastYear?: string
}

interface ProjectionParams {
  principal: number
  annualRate: number
  financialPlanningYear?: IFinancialPlanningProps[]
  durationInYears?: number
  goalDate?: { year: number; month: number }
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

export const calculateProjection = (
  params: ProjectionParams
): YearProjection[] => {
  const {
    principal,
    annualRate,
    financialPlanningYear = [],
    durationInYears,
    goalDate
  } = params

  const results: YearProjection[] = []
  const monthlyRate = annualRate / 100 / 12
  const today = new Date()

  let futureValue = principal
  let cumulativeContributions = 0
  let totalInterestAccumulated = 0
  let lastApplicablePlan: IFinancialPlanningProps | undefined = undefined

  const startYear = today.getFullYear()
  const startMonth = today.getMonth()
  const endYear = goalDate?.year || startYear + (durationInYears || 1)
  const loopDuration = endYear - startYear + 1

  for (let i = 0; i < loopDuration; i++) {
    const calendarYear = startYear + i
    const currentPlan = financialPlanningYear.find(
      (p) => Number(p.year) === calendarYear
    )
    if (currentPlan) lastApplicablePlan = currentPlan

    const monthlyContribution =
      Number(lastApplicablePlan?.monthlyContributions) || 0
    const annualAdjustment =
      (Number(lastApplicablePlan?.receivables) || 0) -
      ((Number(lastApplicablePlan?.downPayment) || 0) +
        (Number(lastApplicablePlan?.homePurchases) || 0) +
        (Number(lastApplicablePlan?.otherDeductions) || 0))

    const numberOfPeriods = Number(lastApplicablePlan?.periodContributions) || 0
    const currentYearEndMonth =
      goalDate && calendarYear === goalDate.year ? goalDate.month : 11
    const currentYearStartMonth = i === 0 ? startMonth : 0

    let contributionsMadeThisYear = 0

    for (
      let month = currentYearStartMonth;
      month <= currentYearEndMonth;
      month++
    ) {
      // 1. Cálculo de Juros sobre o montante acumulado (Juros sobre Juros Mensal)
      const interestOfMonth = futureValue * monthlyRate
      totalInterestAccumulated += interestOfMonth

      // 2. Cálculo de Aporte
      let contributionThisMonth = 0
      if (contributionsMadeThisYear < numberOfPeriods) {
        contributionThisMonth = monthlyContribution
        cumulativeContributions += monthlyContribution
        contributionsMadeThisYear++
      }

      // 3. Ajuste Anual em Dezembro
      if (month === 11) {
        contributionThisMonth += annualAdjustment
        cumulativeContributions += annualAdjustment
      }

      // 4. Atualização do Montante Final
      futureValue += interestOfMonth + contributionThisMonth
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
    const totalMonths = (goalDate.year - startYear) * 12 + goalDate.month
    results[results.length - 1].monthsRemaining = Math.max(0, totalMonths)
  }

  return results
}
