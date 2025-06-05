'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface MonthYearPickerProps {
  value?: string // "MM/YYYY" format
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function MonthYearPicker({
  value,
  onChange,
  placeholder = 'Selecione mês/ano',
  className = ''
}: MonthYearPickerProps) {
  // Convert "MM/YYYY" string to Date object for DatePicker
  const getDateFromValue = (dateString?: string): Date => {
    if (!dateString) return new Date()

    const [month, year] = dateString.split('/')
    return new Date(parseInt(year), parseInt(month) - 1, 1)
  }

  const [selectedDate, setSelectedDate] = useState<Date>(
    getDateFromValue(value)
  )

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date)

      // Format to "MM/YYYY" string
      const formattedDate = date.toLocaleDateString('pt-BR', {
        month: '2-digit',
        year: 'numeric'
      })

      onChange(formattedDate)
    }
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText={placeholder}
      className={`px-4 py-2.5 bg-transparent text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors ${className}`}
    />
  )
}

export default MonthYearPicker
