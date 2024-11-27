import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'
import { IDividendProps } from '@/hooks/finance/useFetchDividends'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import {
  Skeleton,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Grid,
  GridItem,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Select
} from '@chakra-ui/react'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import React from 'react'
import { BarChart, CartesianGrid, XAxis, Bar, YAxis } from 'recharts'

interface InvestmentsAndDividendsCardProps {
  userData: UserData
  dividendsData: IDividendProps[]
  isLoadingDividendsData: boolean
  refetchDividendsData: () => void
  isVisibilityData: boolean
  allPiesData?: IGetAllPies
  currentPage: number
  setCurrentPage: any
}

export function Dividends({
  userData,
  dividendsData,
  isLoadingDividendsData,
  refetchDividendsData,
  isVisibilityData,
  currentPage,
  setCurrentPage
}: InvestmentsAndDividendsCardProps) {
  const formattedDividendsData = dividendsData
    ? dividendsData?.reduce(
        (acc: any, curr: any) => {
          const month = new Date(curr.paidOn).toLocaleString('default', {
            month: 'short'
          })
          const existingMonth = acc.find((item: any) => item.name === month)
          if (existingMonth) {
            existingMonth.value += curr.amountInEuro
          } else {
            acc.push({
              name: month,
              value: curr.amountInEuro,
              fill: 'hsl(var(--chart-1))'
            })
          }
          return acc
        },
        [] as { name: string; value: number; fill: string }[]
      )
    : []

  formattedDividendsData.sort((a: any, b: any) => {
    const monthA = new Date(Date.parse(a.name + ' 1, 2000')).getMonth()
    const monthB = new Date(Date.parse(b.name + ' 1, 2000')).getMonth()
    return monthA - monthB
  })

  const chartConfig = {
    value: {
      label: 'Valor Mês',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig

  return (
    <>
      {isLoadingDividendsData ? (
        <Skeleton
          width={{ base: '100%', lg: '2xl' }}
          h="max-content"
          minHeight="570px"
          rounded="md"
        />
      ) : (
        <Card
          width={{ base: '100%', lg: '2xl' }}
          minHeight="570px"
          maxH="570px"
        >
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
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
          <CardBody display="flex" flexDir="column">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={formattedDividendsData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    formatCurrencyMoney(
                      Number(value),
                      userData.primary_currency,
                      isVisibilityData
                    )
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
            <Select
              value={currentPage}
              onChange={(event) => setCurrentPage(event.target.value)}
              variant="flushed"
              mb={6}
              mt={2}
            >
              <option value={10}>10 itens por página</option>
              <option value={20}>20 itens por página</option>
              <option value={50}>50 itens por página</option>
            </Select>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={6}
              overflowY="auto"
              maxHeight="200px"
            >
              {dividendsData &&
                dividendsData?.map(({ amountInEuro, ticker }: any) => {
                  return (
                    <GridItem key={ticker}>
                      <Stat>
                        <StatLabel fontSize="xs">
                          {tickerToCompanyName[ticker]}
                        </StatLabel>
                        <HStack>
                          <StatNumber fontSize="md">
                            {formatCurrencyMoney(
                              Number(amountInEuro),
                              userData.primary_currency,
                              isVisibilityData
                            )}
                          </StatNumber>
                        </HStack>
                      </Stat>
                    </GridItem>
                  )
                })}
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  )
}
