import { ChartDataProps } from '@/components/ui/chart'

export const chartConfig = {
  visitors: { label: 'Visitors' },
  rendavariavel: { label: 'Renda Variável', color: 'hsl(var(--chart-1))' },
  rendafixa: { label: 'Renda Fixa', color: 'hsl(var(--chart-2))' }
} as const

export const chartData: ChartDataProps[] = [
  { label: 'rendavariavel', value: 11000, fill: 'var(--color-rendavariavel)' },
  { label: 'rendafixa', value: 30000, fill: 'var(--color-rendafixa)' }
]

export const chartDataActual: ChartDataProps[] = [
  { label: 'rendavariavel', value: 0, fill: 'var(--color-rendavariavel)' },
  { label: 'rendafixa', value: 41700.00, fill: 'var(--color-rendafixa)' }
]
