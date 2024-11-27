'use client'

import { InfoCardMoney } from '@/components'
import React from 'react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import Slider from 'react-slick'

import { Box, Icon } from '@chakra-ui/react'
import {
  Wallet,
  Eye,
  MoneyWavy,
  ArrowCircleDown,
  Bank,
  ArrowCircleUp
} from '@phosphor-icons/react'
interface IInfoCardsToControl {
  userData: UserData
  totalEntrys: number
  entrysData: IEntrysData[]
  totalExpensesEurToReal: number
  totalExpensesEurSumRealToReal: number
  infoAction?: () => void
  onOpenTotalEntrys: any
  investments?: any
}

function InfoCardsToControl({
  userData,
  totalEntrys,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  infoAction,
  onOpenTotalEntrys,
  investments
}: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()

  const cardsData = [
    {
      infoData: totalEntrys,
      title: 'Entradas',
      currency: userData.primary_currency,
      isVisibilityData: isVisibilityData,
      icon: ArrowCircleUp,
      iconColor: 'green',
      centerPadding: '0px',
      actionCard: onOpenTotalEntrys,
      contentAction:
        entrysData?.length > 0 ? (
          <Icon
            as={Eye}
            cursor="pointer"
            marginLeft={1}
            color="cyan"
            boxSize={{ base: 4, lg: 4 }}
          />
        ) : null
    },
    ...(userData.typeAccount === 'hybrid'
      ? [
          {
            infoData: totalExpensesEurToReal,
            infoAction: infoAction,
            isVisibilityData: isVisibilityData,
            icon: Wallet,
            iconColor: 'cyan',
            currency: userData.secondary_currency,
            title: `Gastos ${userData.secondary_currency}`
          }
        ]
      : []),
    {
      infoData: totalExpensesEurSumRealToReal,
      title: 'Gastos',
      icon: ArrowCircleDown,
      iconColor: 'red',
      isVisibilityData: isVisibilityData,
      currency: userData.primary_currency
    },
    {
      infoData:
        totalEntrys -
        totalExpensesEurSumRealToReal -
        investments?.totalInvestments,
      currency: userData.primary_currency,
      icon: MoneyWavy,
      iconColor: 'cyan',
      title: 'Livre',
      isVisibilityData: isVisibilityData
    },
    {
      infoData: investments?.totalInvestments,
      currency: userData.primary_currency,
      icon: Bank,
      iconColor: 'cyan',
      title: 'Investimentos',
      isVisibilityData: isVisibilityData
    }
  ]

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    arrowsPadding: 0,
    slidesToShow: 4,
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
    <Slider {...settings} className="w-full">
      {cardsData.map((card, index) => (
        <Box key={index} p={{ base: 2, lg: 4 }} rounded="md">
          <InfoCardMoney {...card} />
        </Box>
      ))}
    </Slider>
  )
}

export default InfoCardsToControl
