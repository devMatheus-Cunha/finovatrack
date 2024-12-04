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
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText
} from '@chakra-ui/react'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData '

const CardToStatsInYear = ({ year }: { year: string }) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(year)

  const investmentPercentage =
    reportDataToYear &&
    (
      (reportDataToYear?.totalInvestments / reportDataToYear?.totalEntrys) *
      100
    ).toFixed(2)

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: reportDataToYear?.totalEntrys
    },
    {
      label: 'Total Gastos',
      value: reportDataToYear?.totalExpenses
    },
    {
      label: 'Total Livre',
      value: reportDataToYear?.totalFree
    },
    {
      label: 'Total Investido',
      value: reportDataToYear?.totalInvestments,
      investments: `${investmentPercentage}%`
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
      {reportDataToYear ? (
        <Card bg="gray.700" rounded="md" h={'40'}>
          <CardHeader display="flex" alignItems="center" pb={0}>
            <Heading size="md">Relatorio Anual</Heading>
          </CardHeader>

          <CardBody pt={0}>
            <Box display="flex" justifyContent="space-evenly" gap={6} mt={3.5}>
              {summaryItems.map((card, index) => (
                <GridItem key={card.label} px={10} py={4} rounded="md">
                  <Stat key={index}>
                    <StatLabel fontSize="xs" color="gray.500">
                      {card.label}
                    </StatLabel>
                    <HStack>
                      <StatNumber
                        fontSize={{ base: 'lg', lg: 'xl' }}
                        textDecor="underline"
                      >
                        {formatCurrencyMoney(
                          card.value,
                          userData.primary_currency,
                          isVisibilityData
                        )}
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
