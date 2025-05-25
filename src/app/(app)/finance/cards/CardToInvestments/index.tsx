import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import {
  calculateInvestmentData,
  chartConfig,
  createChartConfig
} from './utils'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Card, Charts } from '@/components'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

interface IRodela {
  investimentsData: IInvestimentsData | undefined
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  isLoadingAllPies: boolean
}

const CardToInvestments = ({
  investimentsData,
  refetchInvestimentsData,
  isLoadingAllPies,
  isLoadingInvestimentsData
}: IRodela) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const {
    totalAccountValue,
    assetAppreciation,
    investedValue,
    dividends,
    appreciationPercentage,
    totalInvestedAndGains,
    totalInvestedAndGainsPercentage,
    totalAppreciationValue,
    totalInterest
  } = calculateInvestmentData(investimentsData)

  const { chartData, formatDataToStats } = createChartConfig(
    investimentsData,
    investedValue,
    assetAppreciation,
    dividends,
    totalInvestedAndGains,
    isVisibilityData,
    appreciationPercentage,
    totalInvestedAndGainsPercentage,
    totalAppreciationValue,
    totalInterest
  )

  return (
    <Card
      title="Investimenos Tranding 212"
      isLoading={isLoadingAllPies || isLoadingInvestimentsData}
      hasData={!!investimentsData}
      className="w-full lg:max-w-md min-h-[570px] max-h-[570px] flex flex-col"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={refetchInvestimentsData}
          className="hover:text-gray-400 p-1 rounded transition-colors"
        >
          <ArrowsCounterClockwise
            size={20}
            color="#fff"
            className="hover:opacity-75"
          />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Charts.PieChart
          chartConfig={chartConfig}
          chartData={chartData}
          total={formatCurrencyMoney(
            Number(totalAccountValue),
            userData.primary_currency,
            isVisibilityData
          )}
        />
        <Charts.DescriptionChart dataStats={formatDataToStats} />
      </div>
    </Card>
  )
}

export default CardToInvestments
