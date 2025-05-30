import { PieChartCircleData } from '@/components/common/Charts/PieChartCircle'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { blueHexShades } from '@/utils/colors'

export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: string
}

export const createChartConfig = (
  investimentsData: IInvestimentsData | undefined,
  isVisibilityData: boolean
): {
  chartData: PieChartCircleData[]
  formatDataToStats: IFormatDataToStats[]
} => {
  const chartData: PieChartCircleData[] = [
    {
      label: 'Disponível',
      value: investimentsData?.totalNaoInvestido || 0,
      color: blueHexShades.blue600
    },
    {
      label: 'Aplicado',
      value: investimentsData?.totalInvestido || 0,
      color: blueHexShades.blue400
    },
    {
      label: 'Dividendos',
      value: investimentsData?.totalDividendos || 0,
      color: blueHexShades.blue300
    }
  ]

  const formatDataToStats: IFormatDataToStats[] = [
    { label: 'Disponível', value: investimentsData?.totalNaoInvestido || 0 },
    { label: 'Aplicado', value: investimentsData?.totalInvestido || 0 },
    {
      label: 'Valorização Ativos',
      value: investimentsData?.investEValorizacao || 0
    },
    {
      label: 'Valor Valorização',
      value: investimentsData?.valorValorizacaoInvest || 0,
      percentage: isVisibilityData
        ? `(${investimentsData?.porcValorizacaoInv}%)`
        : '****'
    },
    {
      label: 'Valor Juros',
      value: investimentsData?.totalJurosValorLivre.atual || 0
    },
    {
      label: 'Valor Dividendos',
      value: investimentsData?.totalDividendos || 0
    },
    {
      label: 'Valorizações + Div',
      value: investimentsData?.totalValoriEJuros || 0,
      percentage: isVisibilityData
        ? `(${investimentsData?.porcLucroTotal}%)`
        : '****'
    }
  ]

  return { chartData, formatDataToStats }
}
