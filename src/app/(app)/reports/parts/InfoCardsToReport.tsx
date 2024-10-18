'use client'

import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { useIsVisibilityDatas } from '@/hooks/globalStates'
import Slider from 'react-slick'

import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import { formatCurrencyMoney } from '@/utils/formatNumber'
interface IInfoCardsToControl {
  userData: UserData
  data: any
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
      )
    },
    {
      label: 'Foi investido',
      value: `${data?.investments?.investmentPercentageFormat}`
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          arrows: true,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <Box w={{ base: '93%', lg: '98%' }} display="flex" margin="auto" gap={3}>
      <Slider {...settings} className="w-full">
        {summaryItems.map((card, index) => (
          <Box key={index} rounded="md" p="2">
            <Box
              key={index}
              bg="gray.700"
              borderRadius="lg"
              boxShadow="sm"
              p={4}
              textAlign="center"
            >
              <Stat>
                <StatLabel fontSize="xs" color="gray.500">
                  {card.label}
                </StatLabel>
                <StatNumber fontSize={{ base: 'lg', lg: '23' }}>
                  {isVisibilityData ? card.value : '****'}
                </StatNumber>
              </Stat>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default InfoCardsToReport
