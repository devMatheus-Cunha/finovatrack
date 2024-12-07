import useFetchDividends from '@/hooks/finance/useFetchDividends'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Skeleton, Card, CardBody, Heading, CardHeader } from '@chakra-ui/react'
import React from 'react'
import Filter from './Filter'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { chartConfig, formattedDividendsData } from './utils'
import { Charts } from '@/components'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import { FormatChartData } from '@/components/ui/chart'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

const CardToDividends = () => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const {
    dividendsData,
    isLoadingDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  } = useFetchDividends()

  if (isLoadingDividendsData || dividendsData.length <= 0) {
    return (
      <Skeleton
        width={{ base: '100%', lg: '2xl' }}
        h="max-content"
        minHeight="570px"
        rounded="md"
      />
    )
  }

  return (
    <Card
      width={{ base: '100%', lg: '2xl' }}
      minHeight="570px"
      maxH="570px"
      bg="gray.700"
    >
      <CardHeader display="flex" justifyContent="space-between" pb={0}>
        <Heading color="white" size="md">
          Dividendos
        </Heading>
        <button
          type="button"
          onClick={() => refetchDividendsData()}
          className="hover:text-gray-400"
        >
          <ArrowsCounterClockwise
            size={20}
            color="#eee2e2"
            className="hover:opacity-75"
          />
        </button>
      </CardHeader>

      <CardBody display="flex" flexDir="column">
        <Charts.BarChart
          chartData={formattedDividendsData(dividendsData)}
          chartConfig={chartConfig}
          tickFormatter={(value: string) =>
            formatCurrencyMoney(
              Number(value),
              userData.primary_currency,
              isVisibilityData
            )
          }
        />
        <Filter
          currentPage={currentPage}
          onChange={(event) => setCurrentPage(Number(event.target.value))}
        />
        <Charts.DescriptionChart
          dataStats={FormatChartData(dividendsData, 'ticker', 'amount')}
          formatLabel={(value) => tickerToCompanyName[value]}
        />
      </CardBody>
    </Card>
  )
}
export default CardToDividends
