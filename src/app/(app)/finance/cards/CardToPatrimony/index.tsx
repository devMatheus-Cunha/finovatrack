import { useFetchFinancialPlaningYear } from '@/hooks/finance'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useMemo } from 'react'
import { chartConfig, chartDataFormat } from './utilts'
import { Charts } from '@/components'

interface CardToPatrimonyProps {
  isLoadingInvestimentsData: boolean
  investments?: IInvestimentsData
}

const CardToPatrimony = ({
  investments,
  isLoadingInvestimentsData
}: CardToPatrimonyProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const {
    userData: { primary_currency }
  } = useUserData()
  const { financialPlanningActualYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const sumTotalCurrency = useMemo(() => {
    return financialPlanningActualYear?.reserve && investments?.total
      ? Number(financialPlanningActualYear.reserve) + investments.total
      : 0
  }, [financialPlanningActualYear, investments?.total])

  if (
    isLoadingFinancialPlanningYear ||
    isLoadingInvestimentsData ||
    !investments
  ) {
    return (
      <div className="w-full h-[130px] rounded-md bg-gray-700 animate-pulse" />
    )
  }

  return (
    <div className="w-full  p-2 bg-gray-700 rounded-md flex items-center justify-around">
      <h2 className="text-sm lg:text-xl text-white font-semibold">
        Patrimônio atual
      </h2>
      <Charts.RadialBarChart
        chartConfig={chartConfig}
        chartData={chartDataFormat(
          investments?.free,
          investments?.pies?.result?.priceAvgValue,
          Number(financialPlanningActualYear?.reserve)
        )}
        total={formatCurrencyMoney(
          Number(sumTotalCurrency) || 0,
          primary_currency,
          isVisibilityData
        )}
      />
    </div>
  )
}

export default CardToPatrimony
