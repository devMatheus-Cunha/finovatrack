import { ChartConfigProps } from '@/components/ui/chart'

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
} satisfies ChartConfigProps

export const chartDataFormat = (
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
