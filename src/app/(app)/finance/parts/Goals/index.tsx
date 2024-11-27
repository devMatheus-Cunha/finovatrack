'use client'

import React, { useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  ChartConfig,
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
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'

interface IGoals {
  userData: UserData
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  allPiesData?: IGetAllPies
  isVisibilityData: boolean
  investmentValue?: number
  investmentFree?: number
  millenium?: number
}

export const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  rendavariavel: {
    label: 'Renda Variável',
    color: 'hsl(var(--chart-1))'
  },
  rendafixa: {
    label: 'Renda Fixa',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export const chartData = [
  {
    apps: 'rendavariavel',
    value: 11165,
    fill: 'var(--color-rendavariavel)'
  },
  {
    apps: 'rendafixa',
    value: 30000,
    fill: 'var(--color-rendafixa)'
  }
]

export const Goals = ({
  userData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  allPiesData,
  isVisibilityData,
  investmentFree,
  millenium
}: IGoals) => {
  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  if (!allPiesData) return
  const assetAppreciation = allPiesData.result.priceAvgValue || 0

  const investmentData = [
    {
      label: 'Renda Fixa Hoje',
      value: (investmentFree && millenium && investmentFree + millenium) || 0
    },
    { label: 'Renda Fixa Objetivo', value: 30000 },
    { label: 'Renda Variável Hoje', value: assetAppreciation || 0 },
    { label: 'Renda Variável Objetivo', value: 11175 }
  ]

  return (
    <>
      {isLoadingInvestimentsData ? (
        <Skeleton
          width={{ base: '100%', lg: '3' }}
          h="max-content"
          minHeight="420px"
          rounded="md"
        />
      ) : (
        <Card
          width={{ base: '100%', lg: 'max-content' }}
          h="max-content"
          minHeight="420px"
        >
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size="md">Objetivo para 2026</Heading>
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
                  dataKey="value"
                  nameKey="apps"
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
                                Number(totalValue),
                                userData.primary_currency,
                                isVisibilityData
                              )}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-slate-200"
                            >
                              Meta
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
                    <StatLabel fontSize="xs">{item.label}</StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: 'lg' }}>
                        {formatCurrencyMoney(
                          Number(item.value),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </StatNumber>
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
