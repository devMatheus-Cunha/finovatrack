'use client'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Skeleton,
  Grid,
  GridItem,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'
import { chartConfig } from './utils'

interface IRodela {
  userData: UserData
  investimentsData: IInvestmentsProps | undefined
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  allPiesData?: IGetAllPies
  isVisibilityData: boolean
  isLoadingAllPies: boolean
}

export function Investments({
  userData,
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  allPiesData,
  isVisibilityData,
  isLoadingAllPies
}: IRodela) {
  if (!allPiesData) return
  const assetAppreciation = allPiesData.result.priceAvgValue || 0
  const totalAppreciationValue = investimentsData?.ppl || 0
  const investedValue = allPiesData?.result.priceAvgInvestedValue || 0
  const dividends = allPiesData?.dividendDetails?.gained + 0.37 || 0
  const appreciationPercentage = (
    (totalAppreciationValue / investedValue) *
    100
  ).toFixed(2)
  const totalInvestedAndGains =
    investedValue + totalAppreciationValue + dividends

  const chartData = [
    {
      browser: 'chrome',
      visitors: investimentsData?.free || 0,
      fill: 'var(--color-chrome)'
    },
    {
      browser: 'safari',
      visitors: investedValue || 0,
      fill: 'var(--color-safari)'
    },
    {
      browser: 'firefox',
      visitors: assetAppreciation,
      fill: 'var(--color-firefox)'
    },
    { browser: 'edge', visitors: dividends, fill: 'var(--color-edge)' },
    {
      browser: 'other',
      visitors: totalInvestedAndGains,
      fill: 'var(--color-other)'
    }
  ]

  const investmentData = [
    { label: 'Disponível', value: investimentsData?.free || 0 },
    { label: 'Aplicado', value: investedValue || 0 },
    {
      label: 'Valorização Ativos',
      value: assetAppreciation || 0,
      percentage: isVisibilityData ? `(${appreciationPercentage}%)` : '****'
    },
    {
      label: 'Valor Valorização',
      value: totalAppreciationValue
    },
    { label: 'Dividendos', value: dividends || 0 },
    {
      label: 'Valorizações + Div',
      value: totalInvestedAndGains
    }
  ]

  return (
    <>
      {isLoadingInvestimentsData || isLoadingAllPies ? (
        <Skeleton width={{ base: '100%', lg: '2xl' }} h="570px" rounded="md" />
      ) : (
        <Card width={{ base: '100%', lg: '2xl' }} h="570px">
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
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

          <CardBody>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-white text-lg  font-bold "
                            >
                              {formatCurrencyMoney(
                                Number(investimentsData?.total),
                                userData.primary_currency,
                                isVisibilityData
                              )}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-slate-200"
                            >
                              Total Conta
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3.5}>
              {investmentData.map((item) => (
                <GridItem key={item.label}>
                  <Stat>
                    <StatLabel fontSize="sm">{item.label}</StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: 'lg' }}>
                        {formatCurrencyMoney(
                          Number(item.value),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </StatNumber>
                      {item.percentage && (
                        <StatHelpText fontSize="sm">
                          <StatArrow
                            fontSize="sm"
                            type={item.value > 0 ? 'increase' : 'decrease'}
                          />
                          {item.percentage}
                        </StatHelpText>
                      )}
                    </HStack>
                  </Stat>
                </GridItem>
              ))}
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  )
}
