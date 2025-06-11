import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'

export const GOAL_TARGET = 42000
export const GOAL_DEADLINE = { year: 2026, month: 11 } // December 2026 (0-indexed)
export const GOAL_INTEREST_RATE = 1.5

export function calcularValorGuardadoMes(
  financialPlanningYear?: IFinancialPlanningProps[],
  goalDeadline = GOAL_DEADLINE
) {
  if (!financialPlanningYear || financialPlanningYear.length === 0) return 0
  const hoje = new Date()
  const anoAtual = hoje.getFullYear()
  const mesAtual = hoje.getMonth() // 0-indexed
  const anoAlvo = goalDeadline.year
  const mesAlvo = goalDeadline.month

  let totalGuardado = 0
  let totalMeses = 0

  for (let ano = anoAtual; ano <= anoAlvo; ano++) {
    const planning = financialPlanningYear.find((y) => Number(y.year) === ano)
    if (!planning) continue
    let mesesNoAno = 12
    if (ano === anoAtual) {
      mesesNoAno = (ano === anoAlvo ? mesAlvo : 11) - mesAtual + 1
    } else if (ano === anoAlvo) {
      mesesNoAno = mesAlvo + 1
    }
    totalGuardado += mesesNoAno * Number(planning.monthlyContributions)
    totalMeses += mesesNoAno
  }

  return totalMeses > 0 ? totalGuardado / totalMeses : 0
}
