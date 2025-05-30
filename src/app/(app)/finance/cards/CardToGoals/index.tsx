'use client'

import React from 'react'
import { blueShades } from '@/utils/colors'
import { Card } from '@/components'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas } from '@/hooks/globalStates'

interface CardToGoalsProps {
  investimentsData: IInvestimentsData | undefined
}

const CardToGoals = ({ investimentsData }: CardToGoalsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()

  const goals = [
    {
      name: '2027',
      current: investimentsData?.patrimonioTotal,
      target: 42000,
      color: blueShades.blue500
    },
    {
      name: 'Renda fixa',
      current:
        investimentsData &&
        investimentsData?.reserva &&
        investimentsData?.totalNaoInvestido + investimentsData?.reserva,
      target: 30000,
      color: blueShades.blue700
    },
    {
      name: 'Investimentos',
      current: investimentsData?.totalInvestido,
      target: 12000,
      color: blueShades.blue300
    }
  ]

  return (
    <Card
      title="Seus Objetivos"
      className="max-w-md min-h-[320px] mb-2 lg:mb-4"
    >
      <div className="flex flex-row justify-between items-end gap-2 w-full px-1">
        {goals.map((goal) => {
          const percent = Math.min(
            (Number(goal.current || 0) / goal.target) * 100,
            100
          )
          return (
            <div
              key={goal.name}
              className="flex flex-col items-center flex-1 bg-gray-800/70 rounded-xl shadow-lg p-2 border border-gray-700 min-w-[70px] max-w-[90px] w-full"
            >
              <span className="text-[10px] text-gray-300 mb-1 font-medium whitespace-nowrap">
                {formatCurrencyMoney(goal.target, 'EUR', isVisibilityData)}
              </span>
              <div className="relative flex flex-col justify-end h-32 w-6 bg-gray-900 rounded-lg overflow-hidden shadow-inner border border-gray-700">
                <div
                  className={`absolute bottom-0 left-0 w-full rounded-b-lg transition-all duration-700 ${goal.color} shadow-lg`}
                  style={{ height: `${percent}%` }}
                />
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold drop-shadow">
                  {percent.toFixed(0)}%
                </span>
              </div>
              <span className="text-[10px] text-gray-200 mt-1 font-semibold whitespace-nowrap">
                {formatCurrencyMoney(
                  goal.current || 0,
                  'EUR',
                  isVisibilityData
                )}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 text-center max-w-[60px]">
                {goal.name}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
export default CardToGoals
