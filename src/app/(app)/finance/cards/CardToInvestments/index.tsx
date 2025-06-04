import React from 'react'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { createChartConfig } from './utils'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Card, Charts } from '@/components'

interface IRodela {
  investimentsData: IInvestimentsData | undefined
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  isLoadingAllPies: boolean
}

const CardToInvestments = ({
  investimentsData,
  isLoadingAllPies,
  isLoadingInvestimentsData,
  refetchInvestimentsData
}: IRodela) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const { chartData, formatDataToStats } = createChartConfig(
    investimentsData,
    isVisibilityData
  )

  return (
    <Card
      title="Investimentos Trading 212"
      isLoading={isLoadingAllPies || isLoadingInvestimentsData}
      hasData={!!investimentsData}
      className="w-full lg:max-w-md h-[570px] flex flex-col"
      {...(userData.admin ? { action: refetchInvestimentsData } : {})}
    >
      <div className="flex-1 gap-3 flex flex-col">
        <Charts.PieChartCircle
          data={chartData}
          total={Number(investimentsData?.totalPortifolioTranding)}
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
