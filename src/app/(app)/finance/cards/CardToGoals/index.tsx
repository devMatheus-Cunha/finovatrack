'use client'

import React, { useMemo } from 'react'
import {
  Card,
  CardBody,
  Skeleton,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'
import { Header } from './Header'
import { PieChartComponent } from './PieChartComponent'
import { chartData } from './chartConfig'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

interface CardToGoalsProps {
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
  allPiesData?: IGetAllPies
  investmentValue?: number
  investmentFree?: number
  millenium?: number
}

const CardToGoals = ({
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  allPiesData,
  investmentFree,
  millenium
}: CardToGoalsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
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

  if (isLoadingInvestimentsData) {
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
        width={{ base: '100%', lg: 'max-content' }}
        h="max-content"
        minHeight="420px"
        bg="gray.700"
      >
        <Header
          title="Objetivo para 2026"
          onRefresh={refetchInvestimentsData}
        />
        <CardBody>
          <PieChartComponent
            totalValue={totalValue}
            currency={userData.primary_currency}
            isVisibilityData={isVisibilityData}
          />
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3.5}>
            {investmentData.map((item) => (
              <GridItem key={item.label}>
                <Stat>
                  <StatLabel fontSize="xs">{item.label}</StatLabel>
                  <StatNumber fontSize={{ base: 'lg', lg: 'lg' }}>
                    {formatCurrencyMoney(
                      item.value,
                      userData.primary_currency,
                      isVisibilityData
                    )}
                  </StatNumber>
                </Stat>
              </GridItem>
            ))}
          </Grid>
        </CardBody>
      </Card>
    </>
  )
}
export default CardToGoals
