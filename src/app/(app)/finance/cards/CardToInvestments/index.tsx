import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { calculateInvestmentData, createChartConfig } from './utils'
import { Card, CardBody, Skeleton } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { CardHeaderSection, ChartSection, InvestmentStats } from './parts'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

interface IRodela {
  investimentsData: IInvestimentsData | undefined
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  isLoadingAllPies: boolean
}

const CardToInvestments = ({
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  isLoadingAllPies
}: IRodela) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  if (isLoadingInvestimentsData || isLoadingAllPies || !investimentsData) {
    return (
      <Skeleton width={{ base: '100%', lg: '2xl' }} h="570px" rounded="md" />
    )
  }

  const {
    totalAccountValue,
    assetAppreciation,
    investedValue,
    dividends,
    appreciationPercentage,
    totalInvestedAndGains,
    totalInvestedAndGainsPercentage,
    totalAppreciationValue
  } = calculateInvestmentData(investimentsData, investimentsData?.pies)

  const { chartData, formatDataToStats } = createChartConfig(
    investimentsData,
    investedValue,
    assetAppreciation,
    dividends,
    totalInvestedAndGains,
    isVisibilityData,
    appreciationPercentage,
    totalInvestedAndGainsPercentage,
    totalAppreciationValue
  )

  return (
    <Card width={{ base: '100%', lg: '2xl' }} h="570px" bg="gray.700">
      <CardHeaderSection onRefetch={refetchInvestimentsData} />
      <CardBody>
        <ChartSection
          chartData={chartData}
          total={formatCurrencyMoney(
            Number(totalAccountValue),
            userData.primary_currency,
            isVisibilityData
          )}
        />
        <InvestmentStats
          dataStats={formatDataToStats}
          userData={userData}
          isVisibilityData={isVisibilityData}
        />
      </CardBody>
    </Card>
  )
}

export default CardToInvestments
