import { ChartConfig } from '@/components/ui/chart'

export const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  chrome: {
    label: 'Disponível',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Aplicado',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Valorizacao',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Dividendos',
    color: 'hsl(var(--chart-4))'
  },
  other: {
    label: 'Val + Div:',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig
