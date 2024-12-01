import { IDividendProps } from '@/hooks/finance/useFetchDividends'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Skeleton, Card, CardBody } from '@chakra-ui/react'
import React from 'react'
import { CardHeader } from './CardHeader'
import { BarChart } from './BarChart'
import Filter from './Filter'
import { DividendsList } from './DividendsList'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

interface CardToDividendsProps {
  dividendsData: IDividendProps[]
  isLoadingDividendsData: boolean
  refetchDividendsData: () => void
  currentPage: number
  setCurrentPage: any
}

const CardToDividends = ({
  dividendsData,
  isLoadingDividendsData,
  refetchDividendsData,
  currentPage,
  setCurrentPage
}: CardToDividendsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  if (isLoadingDividendsData) {
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
      <CardHeader refetchDividendsData={refetchDividendsData} />
      <CardBody display="flex" flexDir="column">
        <BarChart
          dividendsData={dividendsData}
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
          onChange={(event) => setCurrentPage(event.target.value)}
        />
        <DividendsList
          dividendsData={dividendsData}
          formatAmount={(value) =>
            formatCurrencyMoney(
              value,
              userData.primary_currency,
              isVisibilityData
            )
          }
        />
      </CardBody>
    </Card>
  )
}
export default CardToDividends
