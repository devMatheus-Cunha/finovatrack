export const chartConfig = {
  visitors: { label: 'Visitors' },
  rendavariavel: { label: 'Renda Variável', color: 'hsl(var(--chart-1))' },
  rendafixa: { label: 'Renda Fixa', color: 'hsl(var(--chart-2))' }
} as const

export const chartData = [
  { apps: 'rendavariavel', value: 11165, fill: 'var(--color-rendavariavel)' },
  { apps: 'rendafixa', value: 30000, fill: 'var(--color-rendafixa)' }
]
