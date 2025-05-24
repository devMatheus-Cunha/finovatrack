import { useMemo } from 'react'
import DatePicker from 'react-datepicker'

interface CardHeader {
  setSelectedDate: (date: Date) => void
  year: number
  formattedDate: string
}

const CardToHeaderFilter = ({
  setSelectedDate,
  year,
  formattedDate
}: CardHeader) => {
  const months = useMemo(() => {
    return [
      { month: 'Janeiro', monthNumber: '01', value: `01/${year}` },
      { month: 'Fevereiro', monthNumber: '02', value: `02/${year}` },
      { month: 'Março', monthNumber: '03', value: `03/${year}` },
      { month: 'Abril', monthNumber: '04', value: `04/${year}` },
      { month: 'Maio', monthNumber: '05', value: `05/${year}` },
      { month: 'Junho', monthNumber: '06', value: `06/${year}` },
      { month: 'Julho', monthNumber: '07', value: `07/${year}` },
      { month: 'Agosto', monthNumber: '08', value: `08/${year}` },
      { month: 'Setembro', monthNumber: '09', value: `09/${year}` },
      { month: 'Outubro', monthNumber: '10', value: `10/${year}` },
      { month: 'Novembro', monthNumber: '11', value: `11/${year}` },
      { month: 'Dezembro', monthNumber: '12', value: `12/${year}` }
    ]
  }, [year])

  const selectedMonthIndex = months.findIndex(
    (data) => data.value === formattedDate
  )

  return (
    <div className="bg-gray-700 px-4 py-6 w-full rounded-md text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <span className="text-gray-400 text-sm">Relatorio Mensal</span>
            <div className="font-semibold">Veja todas os dados por mês</div>
          </div>
        </div>
        <div className="flex items-center">
          <DatePicker
            selected={new Date(year, parseInt(formattedDate.split('/')[0]) - 1)}
            showYearPicker
            dateFormat="yyyy"
            onChange={(date: Date) => setSelectedDate(date)}
            customInput={
              <input
                className="border-b border-gray-400 bg-transparent w-24 focus:outline-none focus:border-blue-500 text-white text-center py-1"
                readOnly
              />
            }
          />
        </div>
      </div>

      <div className="mt-6 overflow-auto">
        <div className="flex border-b-2 border-gray-700">
          {months.map((month, idx) => (
            <button
              key={month.value}
              className={`px-4 py-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                idx === selectedMonthIndex
                  ? 'text-blue-500 border-blue-500 font-bold'
                  : 'text-white border-transparent hover:text-blue-400'
              }`}
              onClick={() => {
                const selectedMonth = parseInt(month.monthNumber) - 1
                setSelectedDate(new Date(year, selectedMonth))
              }}
              type="button"
            >
              {month.month}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardToHeaderFilter
