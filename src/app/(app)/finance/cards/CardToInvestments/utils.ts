import { PieChartCircleData } from '@/components/common/Charts/PieChartCircle'
import {
  IInvestimentsData,
  IInvestmentsProps
} from '@/hooks/finance/useFetchInvestiments'
import { blueHexShades } from '@/utils/colors'

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
  chartData: PieChartCircleData[]
  formatDataToStats: IFormatDataToStats[]
} => {
  const chartData: PieChartCircleData[] = [
    {
      label: 'Disponível',
      value: investimentsData?.free || 0,
      color: blueHexShades.blue600
    },
    {
      label: 'Aplicado',
      value: investedValue || 0,
      color: blueHexShades.blue400
    },
    {
      label: 'Dividendos',
      value: dividends,
      color: blueHexShades.blue300
    }
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
