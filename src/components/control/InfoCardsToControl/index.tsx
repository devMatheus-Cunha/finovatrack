'use client'

import React from 'react'
import { InfoCardMoney } from '@/components'
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
    <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
      {cardsData?.map((card, index) => <InfoCardMoney key={index} {...card} />)}
    </div>
  )
}

export default InfoCardsToControl
