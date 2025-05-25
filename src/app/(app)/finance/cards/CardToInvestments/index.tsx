import React from 'react'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { calculateInvestmentData, createChartConfig } from './utils'
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
      title="Investimentos Trading 212"
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
      <div className="flex-1 gap-3 flex flex-col ">
        <Charts.PieChartCircle
          data={chartData}
          total={Number(totalAccountValue)}
          currency={userData.primary_currency}
          isVisibilityData={isVisibilityData}
          showTooltip
        />
        <Charts.DescriptionChart dataStats={formatDataToStats} />
      </div>
    </Card>
  )
}

export default CardToInvestments
