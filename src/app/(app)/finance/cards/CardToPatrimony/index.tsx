import { useFetchFinancialPlaningYear } from '@/hooks/finance'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useMemo } from 'react'
import { chartConfig, chartDataFormat } from './utilts'
import { Card, Charts } from '@/components'

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

  return (
    <Card
      title="Patrimônio atual"
      isLoading={isLoadingFinancialPlanningYear || isLoadingInvestimentsData}
      hasData={!!financialPlanningActualYear || !!investments}
      className="w-full h-[130px] rounded-md flex items-center justify-around"
    >
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
    </Card>
  )
}

export default CardToPatrimony
