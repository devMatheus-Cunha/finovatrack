'use client'

import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { useIsVisibilityDatas } from '@/hooks/globalStates'

import {
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Card,
  CardHeader,
  CardBody,
  Stat,
  Heading,
  Grid,
  GridItem,
  HStack
} from '@chakra-ui/react'

import { formatCurrencyMoney } from '@/utils/formatNumber'

interface IInfoCardsToControl {
  userData: UserData
  data: any
  isLoading: boolean
}

function InfoCardsToReport({ userData, data }: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()

  const summaryItems = [
    { label: 'Total Entradas', value: data?.totalEntrys },
    { label: 'Total Gastos', value: data?.totalExpenses },
    { label: 'Total Livre', value: data?.totalFree },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        data?.investments?.totalInvestments,
        userData?.primary_currency
      ),
      investments: `${data?.investments?.investmentPercentageFormat}`
    }
  ]

  if (userData?.typeAccount === 'hybrid') {
    summaryItems.push(
      {
        label: `Total gastos em ${userData?.secondary_currency}`,
        value: data?.totalExpenseEurToReal
      },
      { label: 'Cotação Usada', value: data?.quatation }
    )
  }

  return (
    <Card bg="gray.700" rounded="md" boxShadow="sm" w="full">
      <CardHeader display="flex" justifyContent="space-between" pb={0}>
        <Heading size="md">Relatorio Total</Heading>
      </CardHeader>

      <CardBody>
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3.5}>
          {summaryItems.map((card, index) => (
            <GridItem key={card.label}>
              <Stat key={index}>
                <StatLabel fontSize="xs" color="gray.500">
                  {card.label}
                </StatLabel>
                <HStack>
                  <StatNumber fontSize={{ base: 'lg', lg: '23' }}>
                    {isVisibilityData
                      ? card.value ||
                        formatCurrencyMoney(
                          0,
                          userData.primary_currency,
                          isVisibilityData
                        )
                      : '****'}
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
        </Grid>
      </CardBody>
    </Card>
  )
}

export default InfoCardsToReport
