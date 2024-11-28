'use client'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { calculateInvestmentData, createChartConfig } from './utils'
import { Card, CardBody } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  CardHeaderSection,
  ChartSection,
  InvestmentStats,
  LoadingSkeleton
} from './parts'

interface IRodela {
  userData: UserData
  investimentsData: IInvestmentsProps | undefined
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  allPiesData?: IGetAllPies
  isVisibilityData: boolean
  isLoadingAllPies: boolean
}

export function Investments({
  userData,
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  allPiesData,
  isVisibilityData,
  isLoadingAllPies
}: IRodela) {
  if (!allPiesData) return

  const {
    totalAccountValue,
    assetAppreciation,
    investedValue,
    dividends,
    appreciationPercentage,
    totalInvestedAndGains,
    totalInvestedAndGainsPercentage,
    totalAppreciationValue
  } = calculateInvestmentData(investimentsData, allPiesData)

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

  if (isLoadingInvestimentsData || isLoadingAllPies) {
    return <LoadingSkeleton />
  }

  return (
    <Card width={{ base: '100%', lg: '2xl' }} h="570px">
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
