import React from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stack,
  StackDivider
} from '@chakra-ui/react'
import { UserData } from '@/hooks/auth/useAuth/types'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IDividendProps } from '@/hooks/finance/useFetchDividends'
import ReactLoading from 'react-loading'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'

interface InvestmentsAndDividendsCardProps {
  userData: UserData
  investimentsData: IInvestmentsProps | undefined
  dividendsData: IDividendProps[] | undefined
  isLoadingInvestimentsData: boolean
  isLoadingDividendsData: boolean
  refetchInvestimentsData: () => void
  refetchDividendsData: () => void
  totalsDividendsData: number
  isVisibilityData: boolean
}

const InvestmentsAndDividendsCard: React.FC<
  InvestmentsAndDividendsCardProps
> = ({
  userData,
  investimentsData,
  dividendsData,
  isLoadingInvestimentsData,
  isLoadingDividendsData,
  refetchInvestimentsData,
  refetchDividendsData,
  totalsDividendsData,
  isVisibilityData
}) => {
  return (
    <Box
      display="flex"
      w="100%"
      gap={6}
      flexDirection={['column', 'column', 'row', 'column', 'row']}
    >
      <Card width="100%" h="max-content" minHeight="300px" maxHeight="300px">
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
                      {tickerToCompanyName[ticker]}
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
  )
}

export default InvestmentsAndDividendsCard
