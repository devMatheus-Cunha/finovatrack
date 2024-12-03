import {
  Skeleton,
  VStack,
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import { IReportData } from '@/services/reports/getReport'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'

const CardToStatsInYear = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const summaryItems = [
    { label: 'Total Entradas', value: reportData?.totalEntrys },
    { label: 'Total Gastos', value: reportData?.totalExpenses },
    { label: 'Total Livre', value: reportData?.totalFree },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        reportData?.investments?.totalInvestments,
        userData?.primary_currency
      ),
      investments: `${reportData?.investments?.investmentPercentageFormat}`
    }
  ]

  if (isLoading) {
    return (
      <Skeleton
        height={{ base: '40', lg: '40' }}
        w={{ base: '100%', lg: '100%' }}
        rounded="md"
      />
    )
  }

  return (
    <>
      {reportData?.data && reportData?.data.length > 0 ? (
        <Card bg="gray.700" rounded="md" h={'40'}>
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size="md">Relatorio Anual</Heading>
          </CardHeader>

          <CardBody pt={0}>
            <Box display="flex" justifyContent="space-between" gap={6} mt={3.5}>
              {summaryItems.map((card, index) => (
                <GridItem key={card.label}>
                  <Stat key={index}>
                    <StatLabel fontSize="xs" color="gray.500">
                      {card.label}
                    </StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: 'xl' }}>
                        {isVisibilityData
                          ? card.value ||
                            formatCurrencyMoney(
                              0,
                              userData.primary_currency,
                              isVisibilityData
                            )
                          : '****'}
                      </StatNumber>
                      {card.investments && (
                        <StatHelpText display="flex" alignItems="center">
                          <StatArrow type="increase" />
                          {card.investments}
                        </StatHelpText>
                      )}
                    </HStack>
                  </Stat>
                </GridItem>
              ))}
            </Box>
          </CardBody>
        </Card>
      ) : (
        <VStack
          h="full"
          alignItems="center"
          justifyContent="center"
          overflowY="auto"
          rounded="md"
          w={{ base: '100%', lg: '100%' }}
          height={{ base: '40', lg: '40' }}
          bg={{ lg: 'gray.700' }}
        >
          <Text mt={4} fontWeight="bold" fontSize={23} color="white">
            Nenhum relatório gerado
          </Text>
          <Text mt={2} fontSize="md" color="gray.300">
            Não há dados disponíveis para este período.
          </Text>
        </VStack>
      )}
    </>
  )
}

export default CardToStatsInYear
