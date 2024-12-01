import { ChartConfig } from '@/components/ui/chart'

export const chartConfig = {
  investmentFree: {
    label: 'Inv Free'
  },
  investmentValue: {
    label: 'Inv'
  },
  millenium: {
    label: 'Millenium'
  }
} satisfies ChartConfig

export const chartData = (
  investmentsFree?: number,
  investmentValue?: number,
  millenium?: number
) => {
  return [
    {
      investmentFree: investmentsFree,
      investmentValue: investmentValue,
      millenium: millenium
    }
  ]
}
