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
 * FUNÇÃO DE CÁLCULO POR MÉDIA MENSAL
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

  const results: YearProjection[] = []

  console.log(
    principal,
    annualRate,
    financialPlanningYear,
    durationInYears,
    goalDate
  )

  // CALCULANDO A MÉDIA MENSAL:
  // Se a taxa anual for 12%, a média mensal será 1% (0.01)
  const monthlyMediaRate = annualRate / 100 / 12

  const today = new Date()
  const startYear = today.getFullYear()
  const startMonth = today.getMonth() // Março = 2

  let futureValue = principal
  let cumulativeContributions = 0
  let totalInterestAccumulated = 0
  let lastPlan: IFinancialPlanningProps | undefined = undefined

  // --- BLOCO 1: DEFINIÇÃO DA DURAÇÃO ---
  const endYear = goalDate?.year || startYear + (durationInYears || 1)
  const loopDuration = endYear - startYear + 1

  // --- BLOCO 2: LOOP ANUAL ---
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

    // Início e fim do ano considerando o mês da meta
    const currentYearStartMonth = i === 0 ? startMonth : 0
    const currentYearEndMonth =
      goalDate && calendarYear === goalDate.year ? goalDate.month : 11

    let contributionsMadeThisYear = 0

    // --- BLOCO 3: LOOP MENSAL (CÁLCULO SIMPLIFICADO) ---
    for (
      let month = currentYearStartMonth;
      month <= currentYearEndMonth;
      month++
    ) {
      // 1. CÁLCULO DO RENDIMENTO PELA MÉDIA
      // Aplica a média mensal sobre o montante que você já tem
      const monthlyInterest = futureValue * monthlyMediaRate
      totalInterestAccumulated += monthlyInterest

      // 2. CÁLCULO DO APORTE
      let contributionThisMonth = 0
      if (contributionsMadeThisYear < numberOfPeriods) {
        contributionThisMonth = monthlyContribution
        cumulativeContributions += monthlyContribution
        contributionsMadeThisYear++
      }

      // 3. AJUSTE ANUAL (DEZEMBRO)
      if (month === 11) {
        contributionThisMonth += annualAdjustment
        cumulativeContributions += annualAdjustment
      }

      // 4. ATUALIZAÇÃO DO SALDO
      // Adicionamos o rendimento e o aporte ao saldo total
      futureValue += monthlyInterest + contributionThisMonth
    }

    // --- BLOCO 4: REGISTRO DO ANO NO ARRAY ---
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

  // --- BLOCO 5: CONTADOR DE MESES RESTANTES ---
  if (results.length > 0 && goalDate) {
    const diffMonths =
      (goalDate.year - startYear) * 12 + (goalDate.month - startMonth)
    // Usamos +1 para garantir que Março a Junho conte 4 meses
    results[results.length - 1].monthsRemaining = Math.max(0, diffMonths + 1)
  }

  return results
}
