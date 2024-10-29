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
import { UserData } from '@/hooks/auth/useAuth/types'
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
}

export function Investments({
  userData,
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  allPiesData,
  isVisibilityData
}: IRodela) {
  if (!allPiesData) return
  const valorizacao = allPiesData.result.priceAvgValue || 0
  const valorValorizacao = investimentsData?.ppl || 0
  const investedValue = allPiesData?.result.priceAvgInvestedValue || 0
  const dividends = allPiesData?.dividendDetails?.gained + 0.37 || 0
  const investmentPercentage = (
    (valorValorizacao / investedValue) *
    100
  ).toFixed(2)
  const investPlusDiv = investedValue + valorValorizacao + dividends

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
    { browser: 'firefox', visitors: valorizacao, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: dividends, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: investPlusDiv, fill: 'var(--color-other)' }
  ]

  const investmentData = [
    { label: 'Disponível', value: investimentsData?.free || 0 },
    { label: 'Aplicado', value: investedValue || 0 },
    {
      label: 'Valorizacao Inves',
      value: valorizacao || 0,
      percentage: isVisibilityData ? `(${investmentPercentage}%)` : '****'
    },
    {
      label: 'Valor Val',
      value: valorValorizacao
    },
    { label: 'Dividendos', value: dividends || 0 },
    {
      label: 'Invest + Val',
      value: investPlusDiv
    }
  ]
  return (
    <>
      {isLoadingInvestimentsData ? (
        <Skeleton width="100%" h="max-content" minHeight="570px" rounded="md" />
      ) : (
        <Card width="100%" h="max-content" minHeight="570px">
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
                              className="fill-white text-lg lg:text-xl font-bold "
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
                    <StatLabel>{item.label}</StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: 'xl' }}>
                        {formatCurrencyMoney(
                          Number(item.value),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </StatNumber>
                      {item.percentage && (
                        <StatHelpText>
                          <StatArrow
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
