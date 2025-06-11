import { FinancialPlanningItem } from './type'

export const financialPlanningData: FinancialPlanningItem[] = [
  {
    year: '2025',
    monthlyContributions: '1150',
    receivables: '0',
    deduction: '0'
  },
  {
    year: '2026',
    monthlyContributions: '1200',
    receivables: '3000',
    deduction: '0'
  },
  {
    year: '2027',
    monthlyContributions: '500',
    receivables: '0',
    deduction: '7500'
  },
  {
    year: '2028',
    monthlyContributions: '600',
    receivables: '0',
    deduction: '0'
  },
  {
    year: '2029',
    monthlyContributions: '750',
    receivables: '0',
    deduction: '0'
  },
  {
    year: '2030',
    monthlyContributions: '850',
    receivables: '0',
    deduction: '0'
  }
]

export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return '€ 0,00'
  return `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
