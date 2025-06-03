import { PieChartCircleData } from '@/components/common/Charts/PieChartCircle'
import { blueHexShades } from '@/utils/colors'

// Centralized goal target and deadline for easier maintenance
export const GOAL_TARGET = 42000
export const GOAL_DEADLINE = { year: 2026, month: 11 } // December 2026 (0-indexed)
export const GOAL_INTEREST_RATE = 0.02

// Calculate months remaining from now until the goal deadline
export function calcularMesesRestantes(goalDeadline = GOAL_DEADLINE) {
  const hoje = new Date()
  const dataAlvo = new Date(goalDeadline.year, goalDeadline.month, 1)
  const anos = dataAlvo.getFullYear() - hoje.getFullYear()
  const meses = dataAlvo.getMonth() - hoje.getMonth()
  return anos * 12 + meses
}

// Calculate average monthly saved value based on planning years and goal deadline
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
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

// Compound interest forecast calculation
export function calcularPrevisao(
  valorMes: number,
  meses: number,
  taxaAnual: number,
  valorInicial = 0
) {
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1
  let total = valorInicial
  for (let i = 0; i < meses; i++) {
    total = (total + valorMes) * (1 + taxaMensal)
  }
  return total
}

// Nova função para calcular o valor total previsto até o GOAL_DEADLINE considerando receivables (aporte extra) e deduction
export function calcularPrevisaoComExtrasEDeducoes(
  financialPlanningYear: IFinancialPlanningProps[] | undefined,
  goalDeadline = GOAL_DEADLINE,
  taxaAnual = GOAL_INTEREST_RATE,
  valorInicial = 0
) {
  if (!financialPlanningYear || financialPlanningYear.length === 0)
    return valorInicial
  const hoje = new Date()
  const anoAtual = hoje.getFullYear()
  const mesAtual = hoje.getMonth() // 0-indexed
  const anoAlvo = goalDeadline.year
  const mesAlvo = goalDeadline.month
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1

  let total = valorInicial

  for (let ano = anoAtual; ano <= anoAlvo; ano++) {
    const planning = financialPlanningYear.find((y) => Number(y.year) === ano)
    if (!planning) continue
    let mesesNoAno = 12
    if (ano === anoAtual) {
      mesesNoAno = (ano === anoAlvo ? mesAlvo : 11) - mesAtual + 1
    } else if (ano === anoAlvo) {
      mesesNoAno = mesAlvo + 1
    }
    const mensal = Number(planning.monthlyContributions)
    const extra = Number(planning.receivables || 0)
    const deducao = Number(planning.deduction || 0)
    for (let i = 0; i < mesesNoAno; i++) {
      // Aplica extra e dedução apenas no primeiro mês do ano
      const entrada = mensal + (i === 0 ? extra : 0) - (i === 0 ? deducao : 0)
      total = (total + entrada) * (1 + taxaMensal)
    }
  }
  return total
}

export const chartConfig = {
  visitors: { label: 'Visitors' },
  rendavariavel: { label: 'Renda Variável', color: blueHexShades.blue600 },
  rendafixa: { label: 'Renda Fixa', color: blueHexShades.blue400 }
} as const

export const chartData: PieChartCircleData[] = [
  { label: 'rendavariavel', value: 11000, color: blueHexShades.blue600 },
  { label: 'rendafixa', value: 30000, color: blueHexShades.blue400 }
]
