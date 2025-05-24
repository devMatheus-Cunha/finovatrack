'use client'

import { useFetchReportsData } from '@/hooks/reports'
import {
  CardToCategoryExpense,
  CardToHeaderFilter,
  CardToStatsInMonth,
  CardToStatsInYear,
  CardToTableExpenses
} from './cards'

function Reports() {
  const { reportData, setSelectedDate, year, formattedDate, isLoading } =
    useFetchReportsData()

  return (
    <div className="flex flex-col w-full p-2 gap-3">
      <CardToStatsInYear year={String(year)} />
      <CardToHeaderFilter
        setSelectedDate={setSelectedDate}
        year={year}
        formattedDate={formattedDate}
      />

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col gap-2">
          <CardToStatsInMonth reportData={reportData} isLoading={isLoading} />
          <CardToTableExpenses reportData={reportData} isLoading={isLoading} />
        </div>
        <CardToCategoryExpense reportData={reportData} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Reports
