'use client'

import React from 'react'
import Slider from 'react-slick'
import { InfoCardMoney } from '@/components'
import useFetchEntrysData from '@/hooks/entrys/useFetchEntrysData'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Box } from '@chakra-ui/react'
import { generateCardsData, settings } from './utils'

interface IInfoCardsToControl {
  totalEntrys: number
  totalExpensesEurToReal: number
  totalExpensesEurSumRealToReal: number
  infoAction?: () => void
  onOpenTotalEntrys: any
  investments?: any
}

function InfoCardsToControl({
  totalEntrys,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  infoAction,
  onOpenTotalEntrys,
  investments
}: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const { entrysData = [] } = useFetchEntrysData()

  const cardsData = generateCardsData({
    totalEntrys,
    totalExpensesEurToReal,
    totalExpensesEurSumRealToReal,
    investments,
    entrysData,
    userData,
    isVisibilityData,
    onOpenTotalEntrys,
    infoAction
  })

  return (
    <Slider {...settings} className="w-full h-[100px] lg:h-[124.5px]">
      {cardsData?.map((card, index) => (
        <Box key={index} p={{ base: 2, lg: 4 }} rounded="md">
          <InfoCardMoney {...card} />
        </Box>
      ))}
    </Slider>
  )
}

export default InfoCardsToControl
