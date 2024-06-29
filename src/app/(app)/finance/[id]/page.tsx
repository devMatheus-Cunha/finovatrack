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
import { useUserData } from '@/hooks/globalStates'

const Finance = () => {
  const { userData } = useUserData()
  const { dividendsData, isLoadingDividendsData, totalsDividendsData } =
    useFetchDividends()
  const { investimentsData, isLoadingInvestimentsData } = useFetchInvestiments()

  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      gap={5}
      h="95vh"
      p={[2, 2, 0]}
    >
      <Box w="100%">
        <FinanceYear investimentsData={investimentsData} userData={userData} />
      </Box>

      <Box
        display="flex"
        w="100%"
        gap={6}
        flexDirection={['column', 'column', 'row', 'column', 'row']}
      >
        <Card width="100%" h="max-content" minHeight="400px" maxHeight="400px">
          <CardHeader>
            <Heading size="md">Investimenos Tranding 212</Heading>
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
                        userData.primary_currency
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
                        userData.primary_currency
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
                        userData.primary_currency
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
                        userData.primary_currency
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
          minHeight="400px"
          maxHeight="400px"
          overflowY="auto"
        >
          <CardHeader>
            <Heading size="md">Dividendos</Heading>
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
                          color="green"
                          fontWeight="bold"
                        >
                          {formatCurrencyMoney(
                            Number(amountInEuro),
                            userData.primary_currency
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
  )
}

export default Finance
