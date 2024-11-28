import { ChartConfig } from '@/components/ui/chart'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'

export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: string
}

export interface ChartData {
  category: string
  value: number
  fill: string
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
}

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

export const createChartConfig = (
  investimentsData: IInvestmentsProps | undefined,
  investedValue: number,
  assetAppreciation: number,
  dividends: number,
  totalInvestedAndGains: number,
  isVisibilityData: boolean,
  appreciationPercentage: number,
  totalInvestedAndGainsPercentage: number,
  totalAppreciationValue: number
): {
  chartData: ChartData[]
  formatDataToStats: IFormatDataToStats[]
} => {
  const chartData: ChartData[] = [
    {
      category: 'Disponível',
      value: investimentsData?.free || 0,
      fill: 'var(--color-chrome)'
    },
    {
      category: 'Aplicado',
      value: investedValue || 0,
      fill: 'var(--color-safari)'
    },
    {
      category: 'Valor Valorização',
      value: totalAppreciationValue,
      fill: 'var(--color-firefox)'
    },
    { category: 'Dividendos', value: dividends, fill: 'var(--color-edge)' }
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
    { label: 'Dividendos', value: dividends },
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
  investimentsData: IInvestmentsProps | undefined,
  allPiesData: any
): CalculatedInvestmentData => {
  const totalAccountValue = investimentsData?.total
  const assetAppreciation = allPiesData?.result?.priceAvgValue || 0
  const totalAppreciationValue = investimentsData?.ppl || 0
  const investedValue = allPiesData?.result?.priceAvgInvestedValue || 0
  const dividends = (allPiesData?.dividendDetails?.gained || 0) + 0.37

  const appreciationPercentage = (totalAppreciationValue / investedValue) * 100
  const totalInvestedAndGains = totalAppreciationValue + dividends
  const totalInvestedAndGainsPercentage =
    (totalInvestedAndGains / investedValue) * 100

  return {
    totalAccountValue,
    assetAppreciation,
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
