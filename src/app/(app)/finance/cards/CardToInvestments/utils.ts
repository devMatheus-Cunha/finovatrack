import { ChartConfigProps, ChartDataProps } from '@/components/ui/chart'
import {
  IInvestimentsData,
  IInvestmentsProps
} from '@/hooks/finance/useFetchInvestiments'

export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: string
}

interface CalculatedInvestmentData {
  assetAppreciation: number
  totalAppreciationValue: number
  investedValue: number
  dividends: number
  appreciationPercentage: number
  totalInvestedAndGains: number
  totalInvestedAndGainsPercentage: number
  totalAccountValue?: number
  totalInterest: number
}

export const chartConfig = {
  value: {
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
} satisfies ChartConfigProps

export const createChartConfig = (
  investimentsData: IInvestmentsProps | undefined,
  investedValue: number,
  assetAppreciation: number,
  dividends: number,
  totalInvestedAndGains: number,
  isVisibilityData: boolean,
  appreciationPercentage: number,
  totalInvestedAndGainsPercentage: number,
  totalAppreciationValue: number,
  totalInterest: number
): {
  chartData: ChartDataProps[]
  formatDataToStats: IFormatDataToStats[]
} => {
  const chartData: ChartDataProps[] = [
    {
      label: 'Disponível',
      value: investimentsData?.free || 0,
      fill: 'var(--color-chrome)'
    },
    {
      label: 'Aplicado',
      value: investedValue || 0,
      fill: 'var(--color-safari)'
    },
    {
      label: 'Valor Valorização',
      value: totalAppreciationValue,
      fill: 'var(--color-firefox)'
    },
    { label: 'Dividendos', value: dividends, fill: 'var(--color-edge)' }
  ]

  const formatDataToStats: IFormatDataToStats[] = [
    { label: 'Disponível', value: investimentsData?.free || 0 },
    { label: 'Aplicado', value: investedValue },
    {
      label: 'Valorização Ativos',
      value: assetAppreciation
    },
    {
      label: 'Valor Valorização',
      value: totalAppreciationValue,
      percentage: isVisibilityData ? `(${appreciationPercentage}%)` : '****'
    },
    {
      label: 'Valor Juros',
      value: totalInterest
    },
    { label: 'Valor Dividendos', value: dividends },
    {
      label: 'Valorizações + Div',
      value: totalInvestedAndGains,
      percentage: isVisibilityData
        ? `(${totalInvestedAndGainsPercentage}%)`
        : '****'
    }
  ]

  return { chartData, formatDataToStats }
}

export const calculateInvestmentData = (
  investimentsData: IInvestimentsData | undefined
): CalculatedInvestmentData => {
  const totalAccountValue = investimentsData?.total
  const assetAppreciation = investimentsData?.pies?.result?.priceAvgValue || 0
  const totalAppreciationValue = investimentsData?.ppl || 0
  const investedValue =
    investimentsData?.pies?.result?.priceAvgInvestedValue || 0
  const dividends =
    (investimentsData?.pies?.dividendDetails?.gained || 0) + 0.37
  const totalInterest = investimentsData?.totalInterest.actual || 0

  const appreciationPercentage = (totalAppreciationValue / investedValue) * 100
  const totalInvestedAndGains =
    totalAppreciationValue + dividends + totalInterest
  const totalInvestedAndGainsPercentage =
    (totalInvestedAndGains / investedValue) * 100

  return {
    totalAccountValue,
    assetAppreciation,
    totalInterest: totalInterest,
    totalAppreciationValue,
    investedValue,
    dividends,
    appreciationPercentage: Number(appreciationPercentage.toFixed(2)),
    totalInvestedAndGains,
    totalInvestedAndGainsPercentage: Number(
      totalInvestedAndGainsPercentage.toFixed(2)
    )
  }
}
