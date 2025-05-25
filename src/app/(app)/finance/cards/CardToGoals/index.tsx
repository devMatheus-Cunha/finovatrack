'use client'

import React, { useMemo } from 'react'
import { chartData } from './utils'
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
      <div className="w-full max-w-md min-h-[420px] rounded-md bg-gray-700 animate-pulse" />
    )
  }

  return (
    <div className="w-full max-w-md min-h-[420px] bg-gray-700 rounded-md">
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-white">Objetivo para 2026</h2>
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
      </div>
      <div className="px-6 pb-6">
        <Charts.PieChartCircle
          data={chartData}
          total={Number(totalValue)}
          currency={userData.primary_currency}
          isVisibilityData={isVisibilityData}
          showTooltip
        />
        <Charts.DescriptionChart dataStats={investmentData} />
      </div>
    </div>
  )
}
export default CardToGoals
