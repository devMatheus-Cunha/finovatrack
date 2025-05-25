'use client'

import {
  CardToCategoryExpense,
  CardToHeaderFilter,
  CardToStatsInMonth,
  CardToStatsInYear,
  CardToTableExpenses
} from './cards'
import { useState } from 'react'

function Reports() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="flex flex-col w-full p-2 gap-3">
      <CardToStatsInYear selectedDate={selectedDate} />
      <CardToHeaderFilter
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col gap-2">
          <CardToStatsInMonth selectedDate={selectedDate} />
          <CardToTableExpenses selectedDate={selectedDate} />
        </div>
        <CardToCategoryExpense selectedDate={selectedDate} />
      </div>
    </div>
  )
}

export default Reports
