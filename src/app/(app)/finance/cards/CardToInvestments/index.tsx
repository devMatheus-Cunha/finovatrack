import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import {
  calculateInvestmentData,
  chartConfig,
  createChartConfig
} from './utils'
import { Card, CardBody, CardHeader, Heading, Skeleton } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { ChartWithDescritions } from '@/components'
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
    totalAppreciationValue,
    totalJuros
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
    totalAppreciationValue,
    totalJuros
  )

  return (
    <Card width={{ base: '100%', lg: '2xl' }} h="570px" bg="gray.700">
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
        <ChartWithDescritions.PieChart
          chartConfig={chartConfig}
          chartData={chartData}
          total={formatCurrencyMoney(
            Number(totalAccountValue),
            userData.primary_currency,
            isVisibilityData
          )}
        />

        <ChartWithDescritions.Descripitons dataStats={formatDataToStats} />
      </CardBody>
    </Card>
  )
}

export default CardToInvestments
