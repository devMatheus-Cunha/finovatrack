import { useFetchFinancialPlaningYear } from '@/hooks/finance'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card, CardBody, Heading, Skeleton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { chartConfig, chartDataFormat } from './utilts'
import { Charts } from '@/components'

interface CardToPatrimonyProps {
  isLoadingInvestimentsData: boolean
  investments?: IInvestimentsData
  millenium?: number
}

const CardToPatrimony = ({
  investments,
  isLoadingInvestimentsData,
  millenium
}: CardToPatrimonyProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const {
    userData: { primary_currency }
  } = useUserData()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const sumTotalCurrency = useMemo(() => {
    return financialPlanningYear && financialPlanningYear.length > 0
      ? financialPlanningYear[0].reserve + investments?.total
      : 0
  }, [financialPlanningYear, investments?.total])

  if (
    isLoadingFinancialPlanningYear ||
    isLoadingInvestimentsData ||
    !investments ||
    !millenium
  ) {
    return <Skeleton height="130px" rounded="md" />
  }

  return (
    <>
      <Card width="100%" height="130px" p={2} bg="gray.700">
        <CardBody
          display="flex"
          flexDir="row"
          justifyContent="space-around"
          p={0}
        >
          <Heading size={{ base: 'sm', lg: 'md' }} mt="50px" color="white">
            Patrimônio atual
          </Heading>

          <Charts.RadialBarChart
            chartConfig={chartConfig}
            chartData={chartDataFormat(
              investments?.free,
              investments?.pies?.result?.priceAvgValue,
              millenium
            )}
            total={formatCurrencyMoney(
              Number(sumTotalCurrency) || 0,
              primary_currency,
              isVisibilityData
            )}
          />
        </CardBody>
      </Card>
    </>
  )
}

export default CardToPatrimony
