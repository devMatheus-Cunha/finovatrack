// SUA TIPAGEM EXISTENTE
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

// Interfaces para a função
interface ProjectionParams {
  principal: number
  annualRate: number
  financialPlanningYear?: IFinancialPlanningProps[]
  durationInYears?: number
  goalDate?: { year: number; month: number } // mês é 1-12
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

/**
 * Calcula a projeção financeira com um motor de cálculo unificado e preciso
 * para 'durationInYears' e 'goalDate'.
 */
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
  // --- SETUP INICIAL ---
  const results: YearProjection[] = []
  const rateAsDecimal = annualRate / 100
  const monthlyRate = rateAsDecimal / 12
  const today = new Date()
  let futureValue = principal
  let cumulativeContributions = 0
  let lastApplicablePlan: IFinancialPlanningProps | undefined = undefined

  // 1. DETERMINA OS LIMITES DA PROJEÇÃO
  let loopDuration: number
  let totalContributionsCount = 0

  if (goalDate) {
    const startYear = today.getFullYear()
    const endYear = goalDate.year
    loopDuration = endYear - startYear + 1

    // CALCULA O TOTAL DE APORTES CORRETAMENTE (ex: 7 + 12 = 19)
    let fallbackPlan: IFinancialPlanningProps | undefined = undefined
    for (let year = startYear; year <= endYear; year++) {
      const plan = financialPlanningYear.find((p) => Number(p.year) === year)
      if (plan) fallbackPlan = plan
      const planToUse = plan || fallbackPlan

      if (year === endYear) {
        totalContributionsCount += goalDate.month + 1
      } else {
        totalContributionsCount += Number(planToUse?.periodContributions) || 0
      }
    }
  } else if (durationInYears) {
    loopDuration = durationInYears
  } else {
    throw new Error('Você deve fornecer ou "durationInYears" ou "goalDate".')
  }

  // --- MOTOR DE CÁLCULO UNIFICADO ---
  for (let i = 0; i < loopDuration; i++) {
    const calendarYear = today.getFullYear() + i

    const currentPlan = financialPlanningYear.find(
      (p) => Number(p.year) === calendarYear
    )
    if (currentPlan) lastApplicablePlan = currentPlan
    const applicablePlan = lastApplicablePlan

    const monthlyContribution =
      Number(applicablePlan?.monthlyContributions) || 0
    const annualAdjustment =
      (Number(applicablePlan?.receivables) || 0) -
      ((Number(applicablePlan?.downPayment) || 0) +
        (Number(applicablePlan?.homePurchases) || 0) +
        (Number(applicablePlan?.otherDeductions) || 0))

    // Define o número de aportes a fazer neste ano específico
    const numberOfPeriods = Number(applicablePlan?.periodContributions) || 0

    // Define os limites de meses para o ano atual do laço
    const startMonth = i === 0 ? today.getMonth() : 0
    const endMonth =
      goalDate && calendarYear === goalDate.year ? goalDate.month : 11

    let contributionsMadeThisYear = 0
    for (let month = startMonth; month <= endMonth; month++) {
      let contributionThisMonth = 0

      // A lógica de aporte que já funcionava, aplicada a ambos os cenários
      if (contributionsMadeThisYear < numberOfPeriods) {
        contributionThisMonth += monthlyContribution
      }
      if (month === 11) {
        // Dezembro
        contributionThisMonth += annualAdjustment
      }

      const interestOfTheMonth = futureValue * monthlyRate
      futureValue += interestOfTheMonth + contributionThisMonth

      if (contributionsMadeThisYear < numberOfPeriods) {
        cumulativeContributions += monthlyContribution
      }
      if (month === 11) {
        cumulativeContributions += annualAdjustment
      }
      contributionsMadeThisYear++
    }

    const totalInvested = principal + cumulativeContributions
    const interestGenerated = futureValue - totalInvested

    const projectionResult: YearProjection = {
      year: i + 1,
      calendarYear,
      endValue: futureValue,
      totalInvested,
      interestGenerated,
      contributionDetails: {
        monthly: monthlyContribution,
        annualAdjustment: annualAdjustment,
        periods: contributionsMadeThisYear
      }
    }

    // Adiciona a contagem correta de aportes totais apenas no último ano
    if (goalDate && calendarYear === goalDate.year) {
      projectionResult.monthsRemaining = totalContributionsCount
    }

    results.push(projectionResult)
  }

  return results
}
