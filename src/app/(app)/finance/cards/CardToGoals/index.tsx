'use client'

import React, { useMemo } from 'react'
import { Card, CardBody, CardHeader, Heading, Skeleton } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { chartConfig, chartData } from './utils'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { Charts } from '@/components'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

interface CardToGoalsProps {
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  investments?: IInvestimentsData
  millenium?: number
}

const CardToGoals = ({
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  millenium,
  investments
}: CardToGoalsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  const assetAppreciation = investments?.pies?.result?.priceAvgValue || 0

  const investmentData = [
    {
      label: 'Renda Fixa Hoje',
      value:
        (investments?.free && millenium && investments?.free + millenium) || 0
    },
    { label: 'Renda Fixa Objetivo', value: 30000 },
    { label: 'Renda Variável Hoje', value: assetAppreciation || 0 },
    { label: 'Renda Variável Objetivo', value: 11175 }
  ]

  if (isLoadingInvestimentsData || !investments || !millenium) {
    return (
      <Skeleton
        width={{ base: '100%', lg: 'md' }}
        h="max-content"
        minHeight="420px"
        rounded="md"
      />
    )
  }

  return (
    <>
      <Card
        width={{ base: '100%', lg: 'md' }}
        h="max-content"
        minHeight="420px"
        bg="gray.700"
      >
        <CardHeader display="flex" justifyContent="space-between" pb={0}>
          <Heading size="md">Objetivo para 2026</Heading>
          <button
            type="button"
            onClick={refetchInvestimentsData}
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
          <Charts.PieChart
            chartConfig={chartConfig}
            chartData={chartData}
            total={formatCurrencyMoney(
              Number(totalValue),
              userData.primary_currency,
              isVisibilityData
            )}
          />

          <Charts.DescriptionChart dataStats={investmentData} />
        </CardBody>
      </Card>
    </>
  )
}
export default CardToGoals
