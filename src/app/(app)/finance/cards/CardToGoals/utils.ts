import { PieChartCircleData } from '@/components/common/Charts/PieChartCircle'
import { blueHexShades } from '@/utils/colors'

export const chartConfig = {
  visitors: { label: 'Visitors' },
  rendavariavel: { label: 'Renda Variável', color: blueHexShades.blue600 },
  rendafixa: { label: 'Renda Fixa', color: blueHexShades.blue400 }
} as const

export const chartData: PieChartCircleData[] = [
  { label: 'rendavariavel', value: 11000, color: blueHexShades.blue600 },
  { label: 'rendafixa', value: 30000, color: blueHexShades.blue400 }
]
