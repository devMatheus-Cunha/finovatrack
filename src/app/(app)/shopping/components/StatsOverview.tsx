import React from 'react'
import { DollarSign } from 'lucide-react'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card } from '@/components'

interface StatsOverviewProps {
  totalUniqueItems: number
  totalOverallValue: number
  includeBoughtInCalculations: boolean
}

export function StatsOverview({
  totalUniqueItems,
  totalOverallValue,
  includeBoughtInCalculations
}: StatsOverviewProps) {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <Card className="bg-gray-700 rounded-xl shadow-md p-6 flex flex-col items-center text-center relative w-full h-full min-h-[265px]">
      <div className="p-3 bg-blue-800 rounded-full mb-4">
        <DollarSign className="w-6 h-6 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mb-2">
        Valor Total Estimado
      </h3>
      <p className="text-4xl font-bold text-blue-400 mb-2">
        {formatCurrencyMoney(
          totalOverallValue,
          userData?.primary_currency,
          isVisibilityData
        )}
      </p>
      <span className="absolute top-4 right-4 bg-blue-600 text-xs text-white px-2 py-1 rounded-full font-semibold shadow">
        {totalUniqueItems} itens
      </span>
      <p className="text-sm text-gray-300 mt-2">
        {includeBoughtInCalculations
          ? `Soma dos preços de todos os itens (incluindo comprados).`
          : `Soma dos preços de todos os itens (não comprados).`}
      </p>
    </Card>
  )
}
