'use client'

import {
  CardToStatsAndCategory,
  CardToHeaderFilter,
  CardToStatsInYear,
  CardToTableExpenses,
  CardToStatsAverageAllHistory,
  CardToStatsAverageAllHistorySubcategories
} from './cards'
import { useState } from 'react'

function Reports() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="flex flex-col w-full p-2 gap-3">
      <CardToStatsInYear
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="flex flex-col md:flex-row gap-2">
        <CardToStatsAverageAllHistory selectedDate={selectedDate} />
        <CardToStatsAverageAllHistorySubcategories
          selectedDate={selectedDate}
        />
      </div>
      <CardToHeaderFilter
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2">
          <CardToStatsAndCategory selectedDate={selectedDate} />
          <CardToTableExpenses selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  )
}

export default Reports
