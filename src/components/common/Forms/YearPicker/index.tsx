import React from 'react'

interface YearPickerProps {
  selected: Date
  onChange: (date: Date) => void
  minYear?: number
  maxYear?: number
  className?: string
}

const getYears = (min: number, max: number) => {
  const years = []
  for (let y = max; y >= min; y--) {
    years.push(y)
  }
  return years
}

const YearPicker: React.FC<YearPickerProps> = ({
  selected,
  onChange,
  minYear = 2024,
  maxYear = new Date().getFullYear(),
  className = ''
}) => {
  const years = getYears(minYear, maxYear)

  return (
    <select
      className={`border-b border-gray-400 cursor-pointer bg-transparent w-24 focus:outline-none focus:border-blue-500 text-white  py-1 ${className}`}
      value={selected.getFullYear()}
      onChange={(e) => {
        const year = parseInt(e.target.value, 10)
        onChange(new Date(year, selected.getMonth(), selected.getDate()))
      }}
    >
      {years.map((year) => (
        <option
          key={year}
          value={year}
          className="bg-gray-800 text-white cursor-pointer"
        >
          {year}
        </option>
      ))}
    </select>
  )
}

export default YearPicker
