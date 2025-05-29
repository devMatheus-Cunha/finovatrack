'use client'

import React from 'react'
import { InfoCardMoney } from '@/components'
import SimpleSlider from '@/components/common/SimpleSlider'
import useFetchEntrysData from '@/hooks/entrys/useFetchEntrysData'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { generateCardsData } from './utils'

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
    <SimpleSlider className="w-full h-[100px] lg:h-[124.5px]" itemsToShow={4}>
      {cardsData?.map((card, index) => (
        <div key={index} className="p-2 lg:p-4 rounded-md">
          <InfoCardMoney {...card} />
        </div>
      ))}
    </SimpleSlider>
  )
}

export default InfoCardsToControl
