'use client'

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import ReactLoading from 'react-loading'
import FinanceYear from './parts/FinanceYaer'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useFetchDividends from '@/hooks/finance/useFetchDividends'
import useFetchInvestiments from '@/hooks/finance/useFetchInvestiments'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchFinancialPlaningYear from '@/hooks/finance/useFetchFinancialPlaningYear'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

const Finance = () => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const {
    dividendsData,
    isLoadingDividendsData,
    totalsDividendsData,
    refetchDividendsData
  } = useFetchDividends()
  const {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData
  } = useFetchInvestiments()
  const { financialPlanningYear } = useFetchFinancialPlaningYear()

  const sumTotalCurrency =
    financialPlanningYear && financialPlanningYear.length > 0
      ? financialPlanningYear[0].reserve + investimentsData?.total
      : 0

  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      gap={5}
      h="95vh"
      p={[2, 2, 0]}
    >
      <Box display="flex" w="100%" gap={6} flexDirection="column">
        <Card width="100%" h="max-content">
          <CardHeader>
            <Heading
              size="md"
              display="flex"
              alignItems="center"
              gap={1}
              alignSelf="end"
            >
              Património atual:{' '}
              <Text
                alignSelf="end"
                fontStyle="italic"
                textDecoration="underline"
                textDecorationColor="green"
              >
                {formatCurrencyMoney(
                  Number(sumTotalCurrency) || 0,
                  userData.primary_currency,
                  isVisibilityData
                )}
              </Text>
            </Heading>
          </CardHeader>
        </Card>
        <Box
          display="flex"
          w="100%"
          gap={6}
          flexDirection={['column', 'column', 'row', 'column', 'row']}
        >
          <Card
            width="100%"
            h="max-content"
            minHeight="300px"
            maxHeight="300px"
          >
            <CardHeader display="flex" justifyContent="space-between">
              <Heading size="md">Investimenos Tranding 212</Heading>
              <button
                type="button"
                onClick={() => refetchInvestimentsData()}
                className="hover:text-gray-400"
              >
                <ArrowsCounterClockwise
                  size={20}
                  color="#eee2e2"
                  className="hover:opacity-75"
                />
              </button>
            </CardHeader>

            {isLoadingInvestimentsData ? (
              <div className="flex h-screen w-full items-center justify-center">
                <ReactLoading
                  type="spinningBubbles"
                  color="#13C1ED"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box display="flex" flexDir="column" gap={8}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Heading size="sm">Total conta: </Heading>
                      <Text
                        fontWeight="bold"
                        fontStyle="italic"
                        textDecor="underline"
                        fontSize="sm"
                        textDecorationColor="green"
                      >
                        {formatCurrencyMoney(
                          Number(investimentsData?.total),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Heading size="sm">Capital não investido: </Heading>
                      <Text
                        fontWeight="bold"
                        fontStyle="italic"
                        textDecor="underline"
                        textDecorationColor="green"
                        fontSize="sm"
                      >
                        {formatCurrencyMoney(
                          Number(investimentsData?.free),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Heading size="sm">Capital investido: </Heading>
                      <Text
                        fontWeight="bold"
                        fontStyle="italic"
                        textDecor="underline"
                        textDecorationColor="green"
                        fontSize="sm"
                      >
                        {formatCurrencyMoney(
                          Number(investimentsData?.invested),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Heading size="sm">Total Dividendos: </Heading>
                      <Text
                        fontWeight="bold"
                        fontStyle="italic"
                        textDecor="underline"
                        textDecorationColor="green"
                        fontSize="sm"
                      >
                        {formatCurrencyMoney(
                          Number(totalsDividendsData),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </CardBody>
            )}
          </Card>
          <Card
            width="100%"
            h="max-content"
            minHeight="300px"
            maxHeight="300px"
            overflowY="auto"
          >
            <CardHeader display="flex" justifyContent="space-between">
              <Heading size="md">Dividendos</Heading>
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

            {isLoadingDividendsData ? (
              <div className="flex h-screen w-full items-center justify-center">
                <ReactLoading
                  type="spinningBubbles"
                  color="#13C1ED"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {dividendsData &&
                    dividendsData?.map(({ amountInEuro, ticker }) => (
                      <>
                        <Heading size="xs" textTransform="uppercase">
                          {ticker}
                        </Heading>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Text pt="2" fontSize="sm">
                            Valor recebido:{' '}
                          </Text>
                          <Text
                            fontSize="sm"
                            alignSelf="end"
                            fontStyle="italic"
                            fontWeight="bold"
                            textDecoration="underline"
                            textDecorationColor="green"
                          >
                            {formatCurrencyMoney(
                              Number(amountInEuro),
                              userData.primary_currency,
                              isVisibilityData
                            )}
                          </Text>
                        </Box>
                      </>
                    ))}
                </Stack>
              </CardBody>
            )}
          </Card>
        </Box>
      </Box>
      <Box w="100%">
        <FinanceYear
          investimentsData={investimentsData}
          userData={userData}
          isVisibilityData={isVisibilityData}
          financialPlanningYear={financialPlanningYear}
        />
      </Box>
    </Box>
  )
}

export default Finance
