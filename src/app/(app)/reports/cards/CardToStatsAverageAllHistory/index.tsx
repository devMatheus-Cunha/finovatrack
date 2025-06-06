import React from 'react'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Card } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useFetchReportsData } from '@/hooks/reports'

interface CardStatsAverageAllHistoryProps {
  selectedDate: Date
}

const CardStatsAverageAllHistory = ({
  selectedDate
}: CardStatsAverageAllHistoryProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { year } = useFetchReportsData(selectedDate)
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(
    String(year)
  )

  const avgTotal = reportDataToYear?.mediaExpenses || 0
  const avgByCategory = reportDataToYear?.mediaExpenseToCategory
    ? Object.entries(reportDataToYear.mediaExpenseToCategory).map(
        ([category, average]) => ({ category, average })
      )
    : []

  return (
    <Card
      title="Médias do Histórico de Gastos"
      isLoading={isLoading}
      hasData={!!reportDataToYear}
      className="w-full h-full min-h-60"
    >
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col items-center bg-gray-800/50 rounded-xl p-4 shadow mb-2">
          <div className="text-sm text-gray-400 mb-1">
            Média Total de Gastos:
          </div>
          <div className="text-xl font-extrabold text-white tracking-tight">
            {isVisibilityData
              ? formatCurrencyMoney(avgTotal, userData.primary_currency)
              : '****'}
          </div>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-400 mb-3 text-center">
            Média de Gastos por Categoria:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {avgByCategory.map((cat) => (
              <li
                key={cat.category}
                className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2"
              >
                <span className="text-gray-300 text-xs font-medium truncate max-w-[120px]">
                  {cat.category}
                </span>
                <span className="text-white text-base font-semibold">
                  {isVisibilityData
                    ? formatCurrencyMoney(
                        cat.average,
                        userData.primary_currency
                      )
                    : '****'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default CardStatsAverageAllHistory
