import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import {
  calculateInvestmentData,
  chartConfig,
  createChartConfig
} from './utils'
import { Card, CardBody, CardHeader, Heading, Skeleton } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Charts } from '@/components'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

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

  if (isLoadingInvestimentsData || isLoadingAllPies || !investimentsData) {
    return <Skeleton w={{ base: '100%', lg: 'md' }} h="570px" rounded="md" />
  }

  return (
    <Card
      w={{ base: '100%', lg: 'md' }}
      minHeight="570px"
      maxH="570px"
      bg="gray.700"
    >
      <CardHeader display="flex" justifyContent="space-between" pb={0}>
        <Heading size="md" color="white">
          Investimenos Tranding 212
        </Heading>
        <button
          type="button"
          onClick={refetchInvestimentsData}
          className="hover:text-gray-400"
        >
          <ArrowsCounterClockwise
            size={20}
            color="white"
            className="hover:opacity-75"
          />
        </button>
      </CardHeader>

      <CardBody>
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
      </CardBody>
    </Card>
  )
}

export default CardToInvestments
